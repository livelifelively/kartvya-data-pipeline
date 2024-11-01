const { chromium } = require('playwright');
const { concat, snakeCase, lowerCase, camelCase } = require('lodash');

const { categoriesDataForVidhansabhaConstituencies } = require('./categories');
const fs = require('fs');
const path = require('path');

async function processPageTitleToTitleTillEnd(page) {
  return await page.evaluate(() => {
    function getHeadingType(heading) {
      if (heading.classList.contains('mw-heading2')) return 'H2';
      if (heading.classList.contains('mw-heading3')) return 'H3';
    }

    function fetchTableFromWikipediaPage(tableElement) {
      let titles = [];
      tableElement.querySelectorAll('thead th').forEach((val) => {
        for (let i = 0; i < val.colSpan; i++) {
          titles.push(val.innerText);
        }
      });

      let tableContent = [];
      tableElement.querySelectorAll('tbody tr').forEach((tr, trIndex) => {
        let tds = tr.querySelectorAll('td, th');
        let rowContent = [];

        tds.forEach((cell, cellIndex) => {
          rowContent.push({
            text: cell.innerText,
            href: cell.querySelector('a')?.href,
            rowSpan: cell.rowSpan,
            colSpan: cell.colSpan,
            index: cellIndex,
          });
        });
        tableContent.push(rowContent);
      });

      let newTableContent = tableContent.reduce(
        (agg, val, idx) => {
          if (idx === 0) agg['maxLength'] = val.length;
          let newVal = new Array(agg['maxLength']);

          // i is pointer to values in the array with overall length smaller than number of titles
          // because it has values being filled from previous rows with larger rowspans
          let i = 0;
          for (let j = 0; j < newVal.length; j++) {
            if (agg.row[j] && agg.row[j].rowSpan > 0) {
              newVal[j] = agg.row[j].content;
              agg.row[j].rowSpan -= 1;
            } else {
              // read value from row, since no value from previous rows
              newVal[j] = val[i];

              // if this value spans across multiple rows, save it to agg.
              if (val[i].rowSpan > 1) {
                agg.row[j] = {};
                agg.row[j].rowSpan = val[i].rowSpan - 1;
                // index would be as per title's index
                agg.row[j].index = j;
                // value will be from current rows readable value (i)
                agg.row[j].content = val[i];
              }

              i += 1;
            }
          }

          agg.tableContent.push(newVal);

          return agg;
        },
        { maxLength: 0, tableContent: [], row: {}, col: [] }
      );

      const toSave = newTableContent.tableContent.map((val) => {
        let toReturn = {};
        for (let i = 0; i < titles.length; i++) {
          if (val[i].text) {
            toReturn[titles[i]] = {};
            (toReturn[titles[i]].text = val[i].text), (toReturn[titles[i]].href = val[i].href);
          }
        }

        return toReturn;
      });

      return toSave;
    }

    function fetchDataFromElement(element, pointedToElement) {
      switch (element.nodeName) {
        case 'TABLE':
          element.data = fetchTableFromWikipediaPage(pointedToElement);
          break;

        default:
          break;
      }
    }

    function traverseClassifyAndProcessElementsTillNext(current, next) {
      let pointedToElement = current;
      let childElements = [];

      while (pointedToElement !== next) {
        let element = {};

        element.nodeName = pointedToElement.nodeName;

        fetchDataFromElement(element, pointedToElement);

        childElements.push(element);

        pointedToElement = pointedToElement.nextElementSibling;
      }

      return childElements;
    }

    /**
     * traverse till the last element on the page
     * @param {HTMLElement} current
     */
    // function traverseClassifyAndProcessElementsTillPageEndNavigation(current) {
    //   let pointedToElement = current;
    //   let childElements = [];

    //   // navbox-styles is class of navbox classes div that is appended right before the navbox
    //   while (!pointedToElement.classList.contains('navbox-styles')) {
    //     let element = {};

    //     element.nodeName = pointedToElement.nodeName;

    //     fetchDataFromElement(element, pointedToElement);

    //     childElements.push(element);

    //     pointedToElement = pointedToElement.nextElementSibling;
    //   }
    // }

    /**
     * iterate on titles, categorize them in sections (if h2) or subsections (if h3)
     * process all the elements found between the titles and add them to respective sections or subsections
     * @param {HTMLElement} current
     * @param {HTMLElement next
     * @param {Object} sections
     */
    function getHeadingChildElementsAndAddToSections(current, next, sections) {
      let sectionOrSubsection = {};

      sectionOrSubsection.elements = traverseClassifyAndProcessElementsTillNext(current.nextElementSibling, next);

      switch (getHeadingType(current)) {
        case 'H2':
          sectionOrSubsection.title = current.querySelector('h2')?.innerText;
          sectionOrSubsection.subSections = [];

          console.log('finished processing H2 ', sectionOrSubsection.title);

          sections.push(sectionOrSubsection);
          break;

        case 'H3':
          sectionOrSubsection.title = current.querySelector('h3')?.innerText;

          console.log('finished processing H3 ', sectionOrSubsection.title);

          sections[sections.length - 1].subSections.push(sectionOrSubsection);
          break;

        default:
          console.error(current.className);
        // throw new Error('H2 H3 not found, a different header encountered');
      }
    }

    function extractDataFromWikipediaMainContent() {
      let allHeadings = document.querySelectorAll('.mw-heading');
      let sections = [];
      allHeadings.forEach((val, idx) => {
        // get child elements till either the next heading element or the end of document element '.navbox-styles'
        let next = allHeadings[idx + 1];
        if (allHeadings.length - 1 === idx) {
          next = document.querySelector('.navbox-styles');
        }
        getHeadingChildElementsAndAddToSections(val, next, sections);
      });

      return sections;
    }

    try {
      return extractDataFromWikipediaMainContent();
    } catch (e) {
      return { error: e, url: location.href };
    }
  });
}

async function openPage(context, url) {
  try {
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForEvent('requestfinished');

    return page;
  } catch (error) {
    console.error(`Failed to open URL: ${url}`, error);
  }
}

async function extractDataFromWikipediaMainContent(context, url) {
  const page = await openPage(context, url);
  const list = await processPageTitleToTitleTillEnd(page);

  await page.close();
  return list;
}

async function processListOfWikipediaPages(pageUrls) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const results = [];

  for (const url of pageUrls) {
    const result = await extractDataFromWikipediaMainContent(context, url);
    console.log('finished processing url: ', url);
    results.push({
      url,
      result,
    });
  }
  console.log('DONE!!!');

  return results;
}

(async () => {
  // const urls = categoriesDataForVidhansabhaConstituencies.data.active;
  const urls = [
    'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Bihar_Legislative_Assembly',
    'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Madhya_Pradesh_Legislative_Assembly',
    'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Mizoram_Legislative_Assembly',
    'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Sikkim_Legislative_Assembly',
    'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Tripura_Legislative_Assembly',
    'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Nagaland_Legislative_Assembly',
    'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Telangana_Legislative_Assembly',
    'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Andhra_Pradesh_Legislative_Assembly',
  ];

  const outputFilePath = path.join(__dirname, 'd-vc-lc_1.json');

  const results = await processListOfWikipediaPages(urls);

  fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2));
})();

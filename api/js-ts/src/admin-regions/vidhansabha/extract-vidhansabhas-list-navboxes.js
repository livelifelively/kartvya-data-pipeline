const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const vscList = require('./vidhansabha-list-states.json');

const outputFilePath = path.join(__dirname, 'vc-list-by-state.json');
const errorFile = path.join(__dirname, 'vc-list-by-state.errors.json');

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

async function extractDataFromWikipediaPage(context, url, state) {
  try {
    const page = await openPage(context, url);
    const list = await processVidhansabhaList(page);

    await page.close();
    return list;
  } catch (error) {
    const errorData = {
      vidhansabha: url,
      state,
      message: error.toString(),
      timestamp: new Date().toISOString(),
    };
    logError(errorData);
  }
}

function logError(errorData) {
  const existingErrors = fs.existsSync(errorFile) ? JSON.parse(fs.readFileSync(errorFile)) : [];
  existingErrors.push(errorData);
  fs.writeFileSync(errorFile, JSON.stringify(existingErrors, null, 2));
}

async function processListOfWikipediaPages(pageUrls) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const allPagesResults = [];

  for (const url of pageUrls) {
    const result = await extractDataFromWikipediaPage(context, url);
    console.log('finished processing url: ', url);
    if (result) {
      allPagesResults.push({
        url,
        result,
      });
    }
  }
  console.log('DONE!!!');

  return allPagesResults;
}

async function processVidhansabhaList(page) {
  // Use the injected functions
  const result = await page.evaluate(() => {
    function getAllAnchorLinks(node) {
      let links = [];
      let linkNodes = node.querySelectorAll('a');

      if (linkNodes.length && linkNodes.length === 1) {
        return linkNodes[0].href;
      } else {
        linkNodes.forEach((val) => {
          links.push(val.href);
        });
      }

      return links;
    }

    function extractDataFromWikipediaNavbox() {
      // get the titles
      let table = document.querySelectorAll('.navbox > table > tbody > tr > th.navbox-title');

      let navBoxes = [];

      // from the title row, iterate to the last row.
      table.forEach((value) => {
        let titleNode = value.lastElementChild;

        let navbox = {
          title: {
            text: titleNode.innerText,
            href: getAllAnchorLinks(titleNode),
          },
          data: [],
        };

        navbox.data = extractDataFromWikipediaNavboxTables(value.parentNode.nextElementSibling, navbox.data);

        navBoxes.push(navbox);
      });

      return navBoxes;
    }

    function extractDataFromWikipediaNavboxTables(startTableRowNode, navboxData) {
      let nextRow = startTableRowNode;

      while (nextRow && nextRow.nodeName === 'TR') {
        let dataRow = {};

        const firstElementChild = nextRow.firstElementChild;
        const lastElementChild = nextRow.lastElementChild;

        if (firstElementChild.nodeName === 'TH' && firstElementChild.classList.contains('navbox-group')) {
          dataRow.label = {
            text: firstElementChild.innerText,
            href: getAllAnchorLinks(firstElementChild),
          };
          dataRow.data = [];

          const nestedTables = lastElementChild.querySelectorAll('table');
          if (nestedTables.length) {
            nestedTables.forEach((val) => {
              const nestedTableFirstRow = val.querySelector('tbody')?.firstElementChild;
              const nestedTableData = extractDataFromWikipediaNavboxTables(nestedTableFirstRow, dataRow.data);

              dataRow.data.concat(nestedTableData);
            });
          } else {
            if (lastElementChild.querySelector('dl')) {
              const dds = lastElementChild.querySelector('dl').querySelectorAll('dd');

              dds.forEach((val) => {
                dataRow.data.push({
                  text: val.innerText,
                  href: val.querySelector('a')?.href,
                });
              });
            } else if (lastElementChild.querySelector('ul')) {
              lastElementChild
                .querySelector('ul')
                .querySelectorAll('li')
                .forEach((val) => {
                  dataRow.data.push({
                    text: val.innerText,
                    href: val.querySelector('a')?.href,
                  });
                });
            } else if (lastElementChild.querySelector('ol')) {
              lastElementChild
                .querySelector('ol')
                .querySelectorAll('li')
                .forEach((val) => {
                  dataRow.data.push({
                    text: val.innerText,
                    href: val.querySelector('a')?.href,
                  });
                });
            } else {
              console.log('HAS SOMETHING ELSE');
              console.log(lastElementChild);
              dataRow.data.push({
                html: lastElementChild.innerHTML,
              });
            }
          }
          // nextRow.lastChild;

          navboxData.push(dataRow);
        }
        nextRow = nextRow.nextElementSibling;
      }

      return navboxData;
    }

    return extractDataFromWikipediaNavbox();
  });

  return result;
}

(async () => {
  const urls = vscList.map((val) => {
    return val.url;
  });
  // console.log(urls);

  const results = await processListOfWikipediaPages(urls);

  fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2));
})();

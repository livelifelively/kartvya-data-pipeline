let apAssemblyTerms = [];

// document
//   .getElementById('t2')
//   .querySelectorAll('tbody tr')
//   .forEach((tr) => {
//     const tds = tr.querySelectorAll('td');
//     apAssemblyTerms.push({
//       assemblyNumber: {
//         text: tds[0].innerText,
//         href: tds[0].querySelector('a')?.href,
//       },
//       establishedOn: tds[1].innerText,
//       dissolvedOn: tds[2].innerText,
//       notes: tds[3].innerText,
//     });
//   });

// tbody > tr > th.scope = col
// tbody > tr > th.scope can be row, can also be no value. so absence of col, should be considered as row
// voter election result row has class "vcard"
function fetchElectionResultTableFromWikipedia(tableElement) {
  //
}

function categorizeWikipediaPageTable(tableElement) {
  const isPlainrowheadersTable = tableElement.classList.contains('plainrowheaders');
  if (isPlainrowheadersTable) {
    const hasCaption = tableElement.children[0].nodeName === 'CAPTION';
    if (hasCaption) {
      const isElectionResultTable = tableElement.children[0].innerText.toLowerCase().includes('election');
      if (isElectionResultTable) {
        return fetchElectionResultTableFromWikipedia(tableElement);
      }
    }
  }
}

// ROW SPAN FIX
// if a table has multiple row span fields, extract data correctly.
// https://en.wikipedia.org/wiki/Template:ElectionResult

function fetchTableFromWikipediaPage(tableElement) {
  let titles = [];
  tableElement.querySelectorAll('thead th').forEach((val) => {
    for (let i = 0; i < val.colSpan; i++) {
      titles.push(val.innerText);
    }
  });

  let tableContent = [];
  tableElement.querySelectorAll('tbody tr').forEach((tr, trIndex) => {
    let tds = tr.querySelectorAll('td');
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

      let i = 0;
      for (let j = 0; j < newVal.length; j++) {
        if (agg.row[j] && agg.row[j].rowSpan > 0) {
          newVal[j] = agg.row[j].content;
          agg.row[j].rowSpan -= 1;
        } else {
          newVal[j] = val[i];

          if (val[i].rowSpan > 1) {
            agg.row[j] = agg.row[j] || {};
            agg.row[j].rowSpan = val[j].rowSpan - 1;
            agg.row[j].index = j;
            agg.row[j].content = val[j];
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

// HEADINGS and children content

// step 1: get all heading sections and get their hierarchy.
// sections = [{h2: <NODE>, h3: [<NODE>]}]
let headings = [];
let sections = [];

allHeadings.forEach((val) => {
  if (val.classList.contains('mw-heading2')) {
    // iterate on headings and append to sections
    if (headings.length) {
      let section = {};
      headings.forEach((v, i) => {
        if (i === 0) {
          section.h2 = v;
          section.h3 = [];
        } else {
          section.h3.push(v);
        }
      });
      sections.push(section);
      headings = [];
    }
    headings.push(val);
  } else if (val.classList.contains('mw-heading3')) {
    headings.push(val);
  } else {
    console.log('EXCEPTION IN HEADINGS ORDER!!!');
    console.log(val);
  }
});

// step 2: iterate and reach the next

// ANOTHER ALGO
function getHeadingType(heading) {
  if (heading.classList.contains('mw-heading2')) return 'H2';
  if (heading.classList.contains('mw-heading3')) return 'H3';
}

function traverseAndClassifyElementsTillNext(current, next) {
  let pointedToElement = current;
  let element = {};
  while (pointedToElement !== next) {
    pointedToElement = current.nextElementSibling;
    element.nodeName = pointedToElement.nodeName;

    switch (element.nodeName) {
      case 'TABLE':
        fetchTableFromWikipediaPage(pointedToElement);
        break;

      default:
        break;
    }
  }
}

sections = [];
function getChildElementsAndAddToSections(current, next) {
  console.log(getHeadingType(current));
  if (!next) {
    console.log('reached the end');
  } else {
    switch (getHeadingType(current)) {
      case 'H2':
        let section = {};
        section.title = current.querySelector('h2')?.innerText;
        section.elements = traverseAndClassifyElementsTillNext(current, next);
        break;

      case 'H3':
        break;

      default:
        break;
    }
  }
  // navbox-styles
}

allHeadings.forEach((val, idx) => {
  if (allHeadings.length - 1 === idx) {
    getChildElementsAndAddToSections(val);
  } else {
    getChildElementsAndAddToSections(val, allHeadings[idx + 1]);
  }
});

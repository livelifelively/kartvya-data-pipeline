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
  // tableElement;
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

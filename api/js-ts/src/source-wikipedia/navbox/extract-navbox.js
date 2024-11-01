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
          const nestedTableFirstRow = val.querySelector('tbody').firstElementChild;
          const nestedTableData = extractDataFromWikipediaNavboxTables(nestedTableFirstRow, dataRow.data);

          dataRow.data.concat(nestedTableData);
        });
      } else {
        if (lastElementChild.querySelector('dl')) {
          const dds = lastElementChild.querySelector('dl').querySelectorAll('dd');

          dds.forEach((val) => {
            dataRow.data.push({
              text: val.innerText,
              href: val.querySelector('a').href,
            });
          });
        } else if (lastElementChild.querySelector('ul')) {
          lastElementChild
            .querySelector('ul')
            .querySelectorAll('li')
            .forEach((val) => {
              dataRow.data.push({
                text: val.innerText,
                href: val.querySelector('a').href,
              });
            });
        } else if (lastElementChild.querySelector('ol')) {
          lastElementChild
            .querySelector('ol')
            .querySelectorAll('li')
            .forEach((val) => {
              dataRow.data.push({
                text: val.innerText,
                href: val.querySelector('a').href,
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

// extractDataFromWikipediaNavbox();

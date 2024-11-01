function readAndRemoveSup(element) {
  links = [];
  element.querySelectorAll('sup').forEach((val) => {
    let link = {
      text: val.querySelector('a').innerText,
      href: val.querySelector('a').href,
    };

    links.push(link);

    val.remove();
  });

  return links;
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

function extractFromVidhansabhaInfoBox() {
  let t = document.querySelectorAll('.infobox.vcard');

  const classesCategories = [
    {
      className: 'infobox-above',
      nodeName: 'TH',
      colSpan: 2,
      dataFunction: (element, data) => {
        data.sup = readAndRemoveSup(element);

        // initiate infobox
        data.heading = element.innerText;
        data.sections = [];

        return data;
      },
    },
    {
      className: 'infobox-subheader',
      nodeName: 'TD',
      colSpan: 2,
      dataFunction: (element, data) => {
        let sup = readAndRemoveSup(element);

        const subheaderLinks = [];
        element.querySelectorAll('a').forEach((val) => {
          subheaderLinks.push({
            text: val.innerText,
            href: val.href,
          });
        });

        return {
          ...data,
          subHeading: {
            text: element.innerText,
            links: subheaderLinks,
            sup,
          },
        };
      },
    },
    {
      className: 'infobox-image',
      nodeName: 'TD',
      colSpan: 2,
      dataFunction: (element, data) => {
        // don't need images yet
        return data;
      },
    },
    {
      className: 'infobox-header',
      nodeName: 'TH',
      colSpan: 2,
      dataFunction: (element, data) => {
        let sup = readAndRemoveSup(element);
        const sectionTitleLinks = [];
        element.querySelectorAll('a').forEach((val) => {
          sectionTitleLinks.push({
            text: val.innerText,
            href: val.href,
            sup,
          });
        });

        const newSection = {
          title: element.innerText,
          links: sectionTitleLinks,
          subSections: [],
        };

        data.sections.push(newSection);

        return data;
      },
    },
    {
      className: 'infobox-label',
      nodeName: 'TH',
      colSpan: 1,
      dataFunction: (element, data) => {
        let sup = readAndRemoveSup(element);

        data.sections[data.sections.length - 1].subSections.push({
          title: element.innerText,
          type: 'infobox-label',
          sup,
        });

        return data;
      },
    },
    {
      className: 'infobox-data',
      nodeName: 'TD',
      colSpan: 1,
      dataFunction: (element, data) => {
        let sup = readAndRemoveSup(element);

        const sectionValueLinks = [];
        element.querySelectorAll('a').forEach((val) => {
          sectionValueLinks.push({
            text: val.innerText,
            href: val.href,
          });
        });

        // add value to subsection
        const subSection = data.sections[data.sections.length - 1].subSections;
        subSection[subSection.length - 1].value = {
          text: element.innerText,
          links: sectionValueLinks,
          sup,
        };

        return data;
      },
    },
    {
      className: 'infobox-full-data',
      nodeName: 'TD',
      colSpan: 2,
      dataFunction: (element, data) => {
        let sup = readAndRemoveSup(element);

        const sectionValueLinks = [];
        element.querySelectorAll('a').forEach((val) => {
          sectionValueLinks.push({
            text: val.innerText,
            href: val.href,
          });
        });

        const subSection = data.sections[data.sections.length - 1].subSections;
        subSection.push({
          type: 'infobox-full-data',
          text: element.innerText,
          links: sectionValueLinks,
          sup,
        });

        return data;
      },
    },
  ];

  let data = {
    heading: '',
    sections: [],
  };

  t.forEach((eachTable) => {
    eachTable.querySelectorAll('tbody tr').forEach((eachRow) => {
      eachRow.querySelectorAll('td, th').forEach((eachCell) => {
        const category = classesCategories.filter(
          (val) =>
            eachCell.classList.contains(val.className) &&
            eachCell.nodeName === val.nodeName &&
            eachCell.colSpan === val.colSpan
        );

        if (category.length === 1) {
          data = category[0].dataFunction(eachCell, data);
        } else {
          console.log(eachCell);
        }
      });
    });
  });

  // refine data
  let constituencyDetailsRaw = infoBox.sections.filter((val) => {
    val.title.toLowerCase() === 'constituency details';
  });

  const allDataFields = {
    country: country,
    region: region,
    state: state,
    division: division,
    district: district,
    lsconstituency: loksabha_constituency,
    loksabha_constituency: loksabha_constituency,
    established: established,
    total_electors: total_electors,
    total_voters: total_electors,
    reservation: reservation,
  };

  let constituencyDetails = {};
  constituencyDetailsRaw.subSections.map((val) => {
    let title = val.title.toLowerCase();
    let key = title.toLowerCase().split(' ').join('_');

    if (allDataFields[key]) {
      constituencyDetails[allDataFields[key]] = [];
      if (val.value.links.length) {
        constituencyDetails[allDataFields[key]].concat(val.value.links);
      } else {
        constituencyDetails[allDataFields[key]].push({ text: val.value.text });
      }
    } else {
      // data key is not expected one.
      constituencyDetails.others = constituencyDetails.others || [];
      constituencyDetails.others.push(val);
    }
  });

  return data;
}

function findGeoJSONMaps() {
  let mapURLs = [];
  document.querySelectorAll('.mw-kartographer-link').forEach((val) => {
    mapURLs.push(val.href);
  });
  return mapURLs;
}

function getWikidataQID() {
  let link = document.getElementById('t-wikibase').querySelector('a').href;
  let linkChunks = link.split('/');

  let qid = '';
  while (qid.length === 0) {
    qid = linkChunks.pop();
  }

  return qid;
}

function getLastEditedOnDate() {
  let dateStr = document.getElementById('footer-info-lastmod').innerText.split('This page was last edited on ')[1];

  // Remove the " at " and " (UTC)." parts to make it easier to parse
  const parts = dateStr.match(/(\d{1,2}) (\w+) (\d{4}), at (\d{2}:\d{2})/);

  if (!parts) {
    throw new Error('Invalid date format');
  }

  // Extracted parts
  const day = parts[1];
  const month = parts[2];
  const year = parts[3];
  const time = parts[4];

  // Reformat to a standard date-time string
  const formattedDateStr = `${day} ${month} ${year} ${time} UTC`;

  // Create a Date object
  return new Date(formattedDateStr);
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

function extractDataFromVidhansabhaPage() {
  let infoBox = extractFromVidhansabhaInfoBox();
  const maps = findGeoJSONMaps();
  const lastUpdatedOn = getLastEditedOnDate();
  const wikidataQID = getWikidataQID();
  const navbox = extractDataFromWikipediaNavbox();

  return {
    infoBox,
    maps,
    lastUpdatedOn,
    wikidataQID,
    navbox,
  };
}

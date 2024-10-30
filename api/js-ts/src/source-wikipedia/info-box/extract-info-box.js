// $(v)
//           .find('sup')
//           .each((j, sup) => {
//             // Capture the citation text
//             citations.push($(sup).text().trim());
//             // Remove the citation from the header text
//             $(sup).remove();
//           });

function extractFromVidhansabhaInfoBox() {
  let t = document.querySelectorAll('.infobox.vcard');

  const classesCategories = [
    {
      className: 'infobox-above',
      nodeName: 'TH',
      colSpan: 2,
      dataFunction: (element, data) => {
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
        const sectionTitleLinks = [];
        element.querySelectorAll('a').forEach((val) => {
          sectionTitleLinks.push({
            text: val.innerText,
            href: val.href,
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
        data.sections[data.sections.length - 1].subSections.push({
          title: element.innerText,
          type: 'infobox-label',
        });

        return data;
      },
    },
    {
      className: 'infobox-data',
      nodeName: 'TD',
      colSpan: 1,
      dataFunction: (element, data) => {
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
        };

        return data;
      },
    },
    {
      className: 'infobox-full-data',
      nodeName: 'TD',
      colSpan: 2,
      dataFunction: (element, data) => {
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

function extractDataFromVidhansabhaPage() {
  const infoBox = extractFromVidhansabhaInfoBox();
  const maps = findGeoJSONMaps();
  const lastUpdatedOn = getLastEditedOnDate();
  const wikidataQID = getWikidataQID();

  return {
    infoBox,
    maps,
    lastUpdatedOn,
    wikidataQID,
  };
}

module.exports = {
  extractDataFromVidhansabhaPage,
};

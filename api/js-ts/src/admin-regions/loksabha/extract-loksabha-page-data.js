const { chromium } = require("playwright");

const path = require("path");
const fs = require("fs");

const { sortBy, keyBy, map, forEach } = require("lodash");

const stateDirPath = "../states/andhra-pradesh";
const { allAPLoksabha } = require(`${stateDirPath}/scripts/loksabha`);

const outputFilePath = path.join(__dirname, stateDirPath, "lc-data.json");
const errorFile = path.join(__dirname, stateDirPath, "lc_errors.json");

async function openPage(context, url) {
  try {
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForEvent("requestfinished");

    return page;
  } catch (error) {
    console.error(`Failed to open URL: ${url}`, error);
  }
}

async function extractDataFromWikipediaPage(context, url, state) {
  try {
    const page = await openPage(context, url);
    const list = await processLoksabhaPage(page);

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
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const allPagesResults = [];

  try {
    for (const url of pageUrls) {
      const result = await extractDataFromWikipediaPage(context, url);
      console.log("finished processing url: ", url);
      if (result) {
        allPagesResults.push({
          url,
          result,
        });
      }
    }
    console.log("DONE!!!");
  } catch (error) {
    console.error("Error processing pages:", error);
  } finally {
    await browser.close(); // Ensure the browser closes
  }

  return allPagesResults;
}

async function processLoksabhaPage(page) {
  // Use the injected functions
  const result = await page.evaluate(() => {
    function readAndRemoveSup(element) {
      links = [];
      element.querySelectorAll("sup").forEach((val) => {
        let link = {
          text: val.querySelector("a").innerText,
          href: val.querySelector("a").href,
        };

        links.push(link);

        val.remove();
      });

      return links;
    }

    function getAllAnchorLinks(node) {
      let links = [];
      let linkNodes = node.querySelectorAll("a");

      if (linkNodes.length && linkNodes.length === 1) {
        return linkNodes[0].href;
      } else {
        linkNodes.forEach((val) => {
          links.push(val.href);
        });
      }

      return links;
    }

    function extractFromLoksabhaInfoBox() {
      let t = document.querySelectorAll(".infobox.vcard");

      const classesCategories = [
        {
          className: "infobox-above",
          nodeName: "TH",
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
          className: "infobox-subheader",
          nodeName: "TD",
          colSpan: 2,
          dataFunction: (element, data) => {
            let sup = readAndRemoveSup(element);

            const subheaderLinks = [];
            element.querySelectorAll("a").forEach((val) => {
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
          className: "infobox-image",
          nodeName: "TD",
          colSpan: 2,
          dataFunction: (element, data) => {
            // don't need images yet
            return data;
          },
        },
        {
          className: "infobox-header",
          nodeName: "TH",
          colSpan: 2,
          dataFunction: (element, data) => {
            let sup = readAndRemoveSup(element);
            const sectionTitleLinks = [];
            element.querySelectorAll("a").forEach((val) => {
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
          className: "infobox-label",
          nodeName: "TH",
          colSpan: 1,
          dataFunction: (element, data) => {
            let sup = readAndRemoveSup(element);

            data.sections[data.sections.length - 1].subSections.push({
              title: element.innerText,
              type: "infobox-label",
              sup,
            });

            return data;
          },
        },
        {
          className: "infobox-data",
          nodeName: "TD",
          colSpan: 1,
          dataFunction: (element, data) => {
            let sup = readAndRemoveSup(element);

            const sectionValueLinks = [];
            element.querySelectorAll("a").forEach((val) => {
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
          className: "infobox-full-data",
          nodeName: "TD",
          colSpan: 2,
          dataFunction: (element, data) => {
            let sup = readAndRemoveSup(element);

            const sectionValueLinks = [];
            element.querySelectorAll("a").forEach((val) => {
              sectionValueLinks.push({
                text: val.innerText,
                href: val.href,
              });
            });

            const subSection = data.sections[data.sections.length - 1].subSections;
            subSection.push({
              type: "infobox-full-data",
              text: element.innerText,
              links: sectionValueLinks,
              sup,
            });

            return data;
          },
        },
      ];

      let data = {
        heading: "",
        sections: [],
      };

      t.forEach((eachTable) => {
        eachTable.querySelectorAll("tbody tr").forEach((eachRow) => {
          eachRow.querySelectorAll("td, th").forEach((eachCell) => {
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
      let constituencyDetailsRaw = data.sections.find((val) => {
        return val.title.toLowerCase() === "constituency details";
      });

      const allDataFields = {
        country: "country",
        region: "region",
        state: "state",
        division: "division",
        district: "district",
        districts: "districts",
        ls_constituency: "loksabha_constituency",
        loksabha_constituency: "loksabha_constituency",
        assembly_constituencies: "vidhansabha_constituencies",
        assembly_constituency: "vidhansabha_constituency",
        established: "established",
        total_electors: "total_electors",
        total_voters: "total_electors",
        reservation: "reservation",
        abolished: "abolished",
      };

      let constituencyDetails = {};
      constituencyDetailsRaw?.subSections.map((val) => {
        let title = val.title.toLowerCase();
        let key = title.toLowerCase().split(" ").join("_");

        if (allDataFields[key]) {
          if (val.value.links.length) {
            constituencyDetails[allDataFields[key]] =
              val.value.links.length === 1 ? val.value.links[0] : [...val.value.links];
          } else {
            constituencyDetails[allDataFields[key]] = { text: val.value.text };
          }
        } else {
          // data key is not expected one.
          constituencyDetails.others = constituencyDetails.others || [];
          constituencyDetails.others.push(val);
        }
      });

      return { ...data, constituencyDetails };
    }

    function findGeoJSONMaps() {
      let mapURLs = [];
      document.querySelectorAll(".mw-kartographer-link").forEach((val) => {
        mapURLs.push(val.href);
      });
      return mapURLs;
    }

    function getWikidataQID() {
      let link = document.getElementById("t-wikibase").querySelector("a").href;
      let linkChunks = link.split("/");

      let qid = "";
      while (qid.length === 0) {
        qid = linkChunks.pop();
      }

      return qid;
    }

    function getLastEditedOnDate() {
      let dateStr = document.getElementById("footer-info-lastmod").innerText.split("This page was last edited on ")[1];

      // Remove the " at " and " (UTC)." parts to make it easier to parse
      const parts = dateStr.match(/(\d{1,2}) (\w+) (\d{4}), at (\d{2}:\d{2})/);

      if (!parts) {
        throw new Error("Invalid date format");
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
      let table = document.querySelectorAll(".navbox > table > tbody > tr > th.navbox-title");

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

      while (nextRow && nextRow.nodeName === "TR") {
        let dataRow = {};

        const firstElementChild = nextRow.firstElementChild;
        const lastElementChild = nextRow.lastElementChild;

        if (firstElementChild.nodeName === "TH" && firstElementChild.classList.contains("navbox-group")) {
          dataRow.label = {
            text: firstElementChild.innerText,
            href: getAllAnchorLinks(firstElementChild),
          };
          dataRow.data = [];

          const nestedTables = lastElementChild.querySelectorAll("table");
          if (nestedTables.length) {
            nestedTables.forEach((val) => {
              const nestedTableFirstRow = val.querySelector("tbody").firstElementChild;
              const nestedTableData = extractDataFromWikipediaNavboxTables(nestedTableFirstRow, dataRow.data);

              dataRow.data.concat(nestedTableData);
            });
          } else {
            if (lastElementChild.querySelector("dl")) {
              const dds = lastElementChild.querySelector("dl").querySelectorAll("dd");

              dds.forEach((val) => {
                dataRow.data.push({
                  text: val.innerText,
                  href: val.querySelector("a").href,
                });
              });
            } else if (lastElementChild.querySelector("ul")) {
              lastElementChild
                .querySelector("ul")
                .querySelectorAll("li")
                .forEach((val) => {
                  dataRow.data.push({
                    text: val.innerText,
                    href: val.querySelector("a").href,
                  });
                });
            } else if (lastElementChild.querySelector("ol")) {
              lastElementChild
                .querySelector("ol")
                .querySelectorAll("li")
                .forEach((val) => {
                  dataRow.data.push({
                    text: val.innerText,
                    href: val.querySelector("a").href,
                  });
                });
            } else {
              console.log("HAS SOMETHING ELSE");
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

    function getWikipediaPageUrl() {
      return window.location.href;
    }

    function extractDataFromLoksabhaPage() {
      let infoBox = extractFromLoksabhaInfoBox();
      // const maps = findGeoJSONMaps();
      const lastUpdatedOn = getLastEditedOnDate();
      const wikidataQID = getWikidataQID();
      const wikipediaPage = getWikipediaPageUrl();

      return {
        infoBox,
        // maps,
        lastUpdatedOn,
        wikidataQID,
        wikipediaPage,
      };
    }

    return extractDataFromLoksabhaPage();
  });

  return result;
}

(async () => {
  const urls = map(allAPLoksabha, (val) => val.href);
  // console.log(urls);
  let results = await processListOfWikipediaPages(urls);
  // results = { results, state: statesUrls[i].state };
  fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2));

  // for (let i = 0; i < statesUrls.length; i++) {
  //   const existingResults = fs.existsSync(outputFilePath) ? JSON.parse(fs.readFileSync(outputFilePath)) : [];
  //   existingResults.push(results);
  //   fs.writeFileSync(outputFilePath, JSON.stringify(existingResults, null, 2));
  // }
})();

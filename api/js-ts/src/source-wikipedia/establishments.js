const { chromium } = require('playwright');
const { concat, snakeCase, lowerCase, camelCase } = require('lodash');

const fs = require('fs');
const path = require('path');

// STEP 1: get decaldal establishments list for all states
// const establishemtsByState = [
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_the_Andaman_and_Nicobar_Islands_by_decade',
//     text: 'Establishments in the Andaman and Nicobar Islands by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Andhra_Pradesh_by_decade',
//     text: 'Establishments in Andhra Pradesh by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Arunachal_Pradesh_by_decade',
//     text: 'Establishments in Arunachal Pradesh by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Assam_by_decade',
//     text: 'Establishments in Assam by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Bihar_by_decade',
//     text: 'Establishments in Bihar by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Bombay_State_by_decade',
//     text: 'Establishments in Bombay State by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Chandigarh_by_decade',
//     text: 'Establishments in Chandigarh by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Chhattisgarh_by_decade',
//     text: 'Establishments in Chhattisgarh by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Dadra_and_Nagar_Haveli_by_decade',
//     text: 'Establishments in Dadra and Nagar Haveli by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Daman_and_Diu_by_decade',
//     text: 'Establishments in Daman and Diu by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Delhi_by_decade',
//     text: 'Establishments in Delhi by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Goa_by_decade',
//     text: 'Establishments in Goa by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Goa,_Daman_and_Diu_by_decade',
//     text: 'Establishments in Goa, Daman and Diu by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Gujarat_by_decade',
//     text: 'Establishments in Gujarat by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Haryana_by_decade',
//     text: 'Establishments in Haryana by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Himachal_Pradesh_by_decade',
//     text: 'Establishments in Himachal Pradesh by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Jammu_and_Kashmir_by_decade',
//     text: 'Establishments in Jammu and Kashmir by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Jharkhand_by_decade',
//     text: 'Establishments in Jharkhand by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Karnataka_by_decade',
//     text: 'Establishments in Karnataka by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Kerala_by_decade',
//     text: 'Establishments in Kerala by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Ladakh_by_decade',
//     text: 'Establishments in Ladakh by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Lakshadweep_by_decade',
//     text: 'Establishments in Lakshadweep by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Madhya_Pradesh_by_decade',
//     text: 'Establishments in Madhya Pradesh by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Maharashtra_by_decade',
//     text: 'Establishments in Maharashtra by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Manipur_by_decade',
//     text: 'Establishments in Manipur by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Meghalaya_by_decade',
//     text: 'Establishments in Meghalaya by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Mizoram_by_decade',
//     text: 'Establishments in Mizoram by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Nagaland_by_decade',
//     text: 'Establishments in Nagaland by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Odisha_by_decade',
//     text: 'Establishments in Odisha by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Puducherry_by_decade',
//     text: 'Establishments in Puducherry by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Punjab,_India_by_decade',
//     text: 'Establishments in Punjab, India by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Rajasthan_by_decade',
//     text: 'Establishments in Rajasthan by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Sikkim_by_decade',
//     text: 'Establishments in Sikkim by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Tamil_Nadu_by_decade',
//     text: 'Establishments in Tamil Nadu by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Telangana_by_decade',
//     text: 'Establishments in Telangana by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Travancore%E2%80%93Cochin_by_decade',
//     text: 'Establishments in Travancore–Cochin by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Tripura_by_decade',
//     text: 'Establishments in Tripura by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Uttar_Pradesh_by_decade',
//     text: 'Establishments in Uttar Pradesh by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_Uttarakhand_by_decade',
//     text: 'Establishments in Uttarakhand by decade',
//   },
//   {
//     url: 'https://en.wikipedia.org/wiki/Category:Establishments_in_West_Bengal_by_decade',
//     text: 'Establishments in West Bengal by decade',
//   },
// ];

// STEP 2: for every state, process all decades
// const establishmentsInDecadeByState = require('./states-establishments-categories-by-decade.json');

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

async function extractWikipediaCategoryUrls(page) {
  return await page.evaluate(() => {
    function extractDataFromWikipediaCategories() {
      let extractedURLs = [];

      document.querySelectorAll('.mw-category .mw-category-group a').forEach((val) => {
        extractedURLs.push({
          url: val.href,
          text: val.text,
        });
      });

      return extractedURLs.filter((val) => val.text.length);
    }

    try {
      return extractDataFromWikipediaCategories();
    } catch (e) {
      return { error: e, url: location.href };
    }
  });
}

// STEP 1 code:
//
// async function processListOfWikipediaPages(pageUrls) {
//   const browser = await chromium.launch({ headless: true });
//   const context = await browser.newContext();

//   const results = [];

//   for (const url of pageUrls) {
//     const page = await openPage(context, url);
//     const list = await extractWikipediaCategoryUrls(page);

//     await page.close();

//     console.log('finished processing url: ', url);
//     results.push({
//       url,
//       result: list,
//     });
//   }
//   console.log('DONE!!!');

//   return results;
// }

// (async () => {
//   const outputFilePath = path.join(__dirname, 'states-establishments-categories.json');

//   const results = await processListOfWikipediaPages(establishemtsByState.map((val) => val.url));

//   fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2));
// })();

/**
 * STEP 2 CODE:
 */
// async function processListOfWikipediaPages(pageUrls) {
//   const browser = await chromium.launch({ headless: true });
//   const context = await browser.newContext();

//   //   let allData = [];

//   for (let state of pageUrls) {
//     console.log('============================================');
//     console.log('starting state ', state.url);
//     console.log('============================================');

//     let stateData = { state: state.state, url: state.url, data: [] };
//     let errors = [];

//     for (let decade of state.result) {
//       try {
//         console.log(decade.url);

//         const page = await openPage(context, decade.url);
//         const list = await extractWikipediaCategoryUrls(page);

//         await page.close();

//         // console.log(list);

//         //   console.log('finished processing url: ', decade.url);
//         stateData.data.push({
//           url: decade.url,
//           years: list,
//         });
//       } catch (e) {
//         console.log(`FAILED TO READ URL ${decade.url}`);
//         errors.push(decade.url);
//         console.error(e);
//       }
//     }

//     const outputFilePath = path.join(__dirname, `state-decade-events/${state.state}.json`);
//     const errorsFilePath = path.join(__dirname, `state-decade-events/${state.state}-errors.json`);

//     fs.writeFileSync(outputFilePath, JSON.stringify(stateData, null, 2));
//     fs.writeFileSync(errorsFilePath, JSON.stringify(errors, null, 2));
//   }

//   console.log('DONE!!!');

//   //   return results;
// }

// (async () => {
//   const results = await processListOfWikipediaPages(establishmentsInDecadeByState);
// })();

/**
 * STEP 3 CODE
 */

const { generateEstablishmentsList } = require('./state-decade-events');

async function processListOfWikipediaPages(pageUrls) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const stateDir = path.join(__dirname, `establishments`);
  fs.mkdirSync(stateDir, { recursive: true });

  for (let state of pageUrls) {
    console.log('============================================');
    console.log('starting state ', state.url);
    console.log('============================================');

    let stateData = { state: state.state, url: state.url, data: [], errors: [] };

    for (let decade of state.data) {
      console.log(decade.url);
      let decadeData = {
        url: decade.url,
        years: [],
      };

      for (let year of decade.years) {
        try {
          const page = await openPage(context, year.url);
          const list = await extractWikipediaCategoryUrls(page);

          await page.close();

          decadeData.years.push({
            url: year.url,
            establishments: list,
          });
        } catch (e) {
          console.log(`FAILED TO READ URL ${year.url}`);
          stateData.errors.push(year.url);
          console.error(e);
        }
      }
    }

    const outputFilePath = path.join(stateDir, `${state.state}.json`);

    fs.writeFileSync(outputFilePath, JSON.stringify(stateData, null, 2));
  }

  console.log('DONE!!!');

  //   return results;
}

(async () => {
  const establishmentsInYearsInDecadeByState = generateEstablishmentsList();
  console.log(establishmentsInYearsInDecadeByState);

  const results = await processListOfWikipediaPages(establishmentsInYearsInDecadeByState);
})();

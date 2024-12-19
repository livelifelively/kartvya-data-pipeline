import axios from "axios";
import * as cheerio from "cheerio";

export const wikipediaPageIds = {
  lastModified: "footer-info-lastmod",
};

export const wikipediaPages = {
  listOfDistrictsOfIndianStates: "https://en.wikipedia.org/wiki/List_of_districts_in_India",
  listOfVidhansabhaConstituenciesOfIndianStates: "https://en.wikipedia.org/wiki/State_legislative_assemblies_of_India",
  listOfLoksabhaConstituenciesOfIndianStates: "https://en.wikipedia.org/wiki/List_of_districts_in_India",
};

export const getWebPageAndDetails = async (url: string) => {
  try {
    const response = await axios.get(url);

    return cheerio.load(response.data);
  } catch (error) {
    throw new Error(`Failed to fetch link preview: ${error}`);
  }
};

// (async () => {
//   // const { $ } = await getWebPageAndDetails(wikipediaPages.listOfDistrictsOfIndianStates);
//   const $ = await getWebPageAndDetails(wikipediaPages.listOfDistrictsOfIndianStates);

//   // var tablesTextArray = $('table.wikitable').map(function() {
//   //   // For each table, find the thead element
//   //   var headers = $(this).find('thead th').map(function() {
//   //       // Return the text of each th
//   //       return $(this).text().trim();
//   //   }).get(); // .get() to convert jQuery object to array

//   //   if (headers.length === 0) {
//   //       // If no th elements were found, try td elements
//   //       headers = $(this).find('thead td').map(function() {
//   //           // Return the text of each td
//   //           return $(this).text().trim();
//   //       }).get(); // .get() to convert jQuery object to array
//   //   }

//   //   return headers; // Return the array of texts
//   // }).get(); // .get() to convert jQuery object to array

//   let allFields: any = {};
//   let citations: any = [];

//   // Iterate over each table header
//   $('.wikitable').each((index, val) => {
//     let fields: any = [];

//     // Find each header cell
//     $(val)
//       .find('tr th')
//       .each((i, v) => {
//         // Remove citation notes (assuming they are in <sup> tags)
//         $(v)
//           .find('sup')
//           .each((j, sup) => {
//             // Capture the citation text
//             citations.push($(sup).text().trim());
//             // Remove the citation from the header text
//             $(sup).remove();
//           });

//         // Push the cleaned header text
//         fields.push($(v).text().trim());
//       });

//     // Use a unique key for the fields
//     if (!allFields[fields.join('__')]) allFields[fields.join('__')] = true;
//   });

//   // Log the results
//   console.log('All Fields:', allFields);
//   console.log('Citations:', citations);

//   console.log(allFields);
// })();

import { createCountryGovernment } from "../../country/country-government/country-government.create";
import { createCountry } from "../../country/country.create";
import { createGraphQLClient } from "../../generic/generic.utils";
import { createName } from "../../name/name.create";

let namesIndia = [
  //   { name: "india", language_script: { name_en: "english_latin" }, created_on: new Date() },
  //   { name: "bharat", language_script: { name_en: "english_latin" }, created_on: new Date() },
  //   { name: "भारत", language_script: { name_en: "hindi_devanagari" }, created_on: new Date() },
];

// let india = {
//   name_id: "india",
//   names: [{ name: "bharat" }, { name: "india" }, { name: "भारत" }],
//   created_on: new Date(),
// };

// let namesGovernmentOfIndia = [
//   { name: "government of india", language_script: { name_en: "english_latin" }, created_on: new Date() },
//   { name: "bharat sarkaar", language_script: { name_en: "english_latin" }, created_on: new Date() },
//   { name: "bharat sarkar", language_script: { name_en: "english_latin" }, created_on: new Date() },
//   { name: "bharatiya sarkaar", language_script: { name_en: "english_latin" }, created_on: new Date() },
//   { name: "indian government", language_script: { name_en: "english_latin" }, created_on: new Date() },
//   { name: "union government", language_script: { name_en: "english_latin" }, created_on: new Date() },
//   { name: "central government", language_script: { name_en: "english_latin" }, created_on: new Date() },
// ];

// let governmentOfIndia = {
//   name_id: "india-government",
//   names: [
//     { name: "government of india" },
//     { name: "bharat sarkaar" },
//     { name: "bharat sarkar" },
//     { name: "bharatiya sarkaar" },
//     { name: "indian government" },
//     { name: "union government" },
//     { name: "central government" },
//   ],
//   created_on: new Date(),
//   governs_country: { name_id: "india" },
// };

// (async () => {
//   const graphQLClient = await createGraphQLClient();
//   for (let n in namesGovernmentOfIndia) {
//     await createName(graphQLClient, namesGovernmentOfIndia[n]);
//   }
//   //   await createCountry(graphQLClient, india);
//   await createCountryGovernment(graphQLClient, governmentOfIndia);
// })();

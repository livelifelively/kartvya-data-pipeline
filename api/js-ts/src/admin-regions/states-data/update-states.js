import { updateNodeType } from "../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../knowledge-graph/generic/generic.utils";

export const statesAndUnionTerritories = [
  {
    name_id: "in-sut-andaman-nicobar-islands",
    established_on: "1 November 1956",
    vehicle_code: "AN",
    iso_code: "IN-AN",
  },
  {
    name_id: "in-sut-chandigarh",
    established_on: "1 November 1966",
    vehicle_code: "CH",
    iso_code: "IN-CH",
  },
  {
    name_id: "in-sut-dadra-nagar-haveli-daman-diu",
    established_on: "26 January 2020",
    vehicle_code: "DD",
    iso_code: "IN-DH",
  },
  {
    name_id: "in-sut-delhi",
    established_on: "1 November 1956",
    vehicle_code: "DL",
    iso_code: "IN-DL",
  },
  {
    name_id: "in-sut-jammu-kashmir",
    established_on: "31 October 2019",
    vehicle_code: "JK",
    iso_code: "IN-JK",
  },
  {
    name_id: "in-sut-ladakh",
    established_on: "31 October 2019",
    vehicle_code: "LA",
    iso_code: "IN-LA",
  },
  {
    name_id: "in-sut-lakshadweep",
    established_on: "1 November 1956",
    vehicle_code: "LD",
    iso_code: "IN-LD",
  },
  {
    name_id: "in-sut-puducherry",
    established_on: "16 August 1962",
    vehicle_code: "PY",
    iso_code: "IN-PY",
  },
  {
    name_id: "in-sut-kerala",
    established_on: "1 November 1956",
    vehicle_code: "KL",
    iso_code: "IN-KL",
  },
  {
    name_id: "in-sut-himachal-pradesh",
    established_on: "25 January 1971",
    vehicle_code: "HP",
    iso_code: "IN-HP",
  },
  {
    name_id: "in-sut-meghalaya",
    established_on: "21 January 1972",
    vehicle_code: "ML",
    iso_code: "IN-ML",
  },
  {
    name_id: "in-sut-jharkhand",
    established_on: "15 November 2000",
    vehicle_code: "JH",
    iso_code: "IN-JH",
  },
  {
    name_id: "in-sut-chhattisgarh",
    established_on: "1 November 2000",
    vehicle_code: "CG",
    iso_code: "IN-CG",
  },
  {
    name_id: "in-sut-bihar",
    established_on: "26 January 1950",
    vehicle_code: "BR",
    iso_code: "IN-BR",
  },
  {
    name_id: "in-sut-goa",
    established_on: "30 May 1987",
    vehicle_code: "GA",
    iso_code: "IN-GA",
  },
  {
    name_id: "in-sut-maharashtra",
    established_on: "1 May 1960",
    vehicle_code: "MH",
    iso_code: "IN-MH",
  },
  {
    name_id: "in-sut-uttar-pradesh",
    established_on: "26 January 1950",
    vehicle_code: "UP",
    iso_code: "IN-UP",
  },
  {
    name_id: "in-sut-west-bengal",
    established_on: "26 January 1950",
    vehicle_code: "WB",
    iso_code: "IN-WB",
  },
  {
    name_id: "in-sut-nagaland",
    established_on: "1 December 1963",
    vehicle_code: "NL",
    iso_code: "IN-NL",
  },
  {
    name_id: "in-sut-rajasthan",
    established_on: "26 January 1950",
    vehicle_code: "RJ",
    iso_code: "IN-RJ",
  },
  {
    name_id: "in-sut-arunachal-pradesh",
    established_on: "20 February 1987",
    vehicle_code: "AR",
    iso_code: "IN-AR",
  },
  {
    name_id: "in-sut-manipur",
    established_on: "21 January 1972",
    vehicle_code: "MN",
    iso_code: "IN-MN",
  },
  {
    name_id: "in-sut-telangana",
    established_on: "2 June 2014",
    vehicle_code: "TG",
    iso_code: "IN-TS",
  },
  {
    name_id: "in-sut-sikkim",
    established_on: "16 May 1975",
    vehicle_code: "SK",
    iso_code: "IN-SK",
  },
  {
    name_id: "in-sut-gujarat",
    established_on: "1 May 1960",
    vehicle_code: "GJ",
    iso_code: "IN-GJ",
  },
  {
    name_id: "in-sut-assam",
    established_on: "26 January 1950",
    vehicle_code: "AS",
    iso_code: "IN-AS",
  },
  {
    name_id: "in-sut-tamil-nadu",
    established_on: "1 November 1956",
    vehicle_code: "TN",
    iso_code: "IN-TN",
  },
  {
    name_id: "in-sut-punjab",
    established_on: "1 November 1966",
    vehicle_code: "PB",
    iso_code: "IN-PB",
  },
  {
    name_id: "in-sut-haryana",
    established_on: "1 November 1966",
    vehicle_code: "HR",
    iso_code: "IN-HR",
  },
  {
    name_id: "in-sut-odisha",
    established_on: "26 January 1950",
    vehicle_code: "OD",
    iso_code: "IN-OD",
  },
  {
    name_id: "in-sut-madhya-pradesh",
    established_on: "1 November 1956",
    vehicle_code: "MP",
    iso_code: "IN-MP",
  },
  {
    name_id: "in-sut-uttarakhand",
    established_on: "9 November 2000",
    vehicle_code: "UK",
    iso_code: "IN-UK",
  },
  {
    name_id: "in-sut-karnataka",
    established_on: "1 November 1956",
    vehicle_code: "KA",
    iso_code: "IN-KA",
  },
  {
    name_id: "in-sut-andhra-pradesh",
    established_on: "1 November 1956",
    vehicle_code: "AP",
    iso_code: "IN-AP",
  },
  {
    name_id: "in-sut-mizoram",
    established_on: "20 February 1987",
    vehicle_code: "MZ",
    iso_code: "IN-MZ",
  },
  {
    name_id: "in-sut-tripura",
    established_on: "21 January 1972",
    vehicle_code: "TR",
    iso_code: "IN-TR",
  },
];

// (async () => {
//   const graphQLClient = await createGraphQLClient();

//   for (let s of statesAndUnionTerritories) {
//     try {
//       const name_id = s.name_id.split("and-").join("");
//       if (name_id !== s.name_id) {
//         console.log(name_id, s.name_id);

//         // await updateNodeType("_Indian_State_Union_Territory_", graphQLClient, {
//         //   filter: { name_id: { eq: s.name_id } },
//         //   set: {
//         //     // vehicle_code: s.vehicle_code,
//         //     // established_on: new Date(s.established_on),
//         //     // iso_code: s.iso_code,
//         //     name_id: name_id,
//         //   },
//         // });
//       }
//     } catch (e) {
//       console.error(e);
//       console.log(JSON.stringify(s));
//     }
//   }
// })();

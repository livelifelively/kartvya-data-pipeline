import { createGraphQLClient } from "../../generic/generic.utils";
import { createGovernmentSystem } from "../../government-system/government-system.create";
import { update_Name_Change_Name_Case } from "../../name/name.update";

/**
 * change names to lowercase
 * add case_sensitive boolean field
 */

// let toChangeNames = [
//   {
//     name: "Colonialism",
//     id: "0x9be95f9fdf",
//   },
//   {
//     name: "Distributism",
//     id: "0x9be95f9fe0",
//   },
//   {
//     name: "Minarchism",
//     id: "0x9be95f9fe1",
//   },
//   {
//     name: "Totalitarianism",
//     id: "0x9be95f9fe2",
//   },
//   {
//     name: "Feudalism",
//     id: "0x9be95f9fe3",
//   },
//   {
//     name: "Capitalism",
//     id: "0x9be95f9fe4",
//   },
//   {
//     name: "Communism",
//     id: "0x9be95f9fe5",
//   },
//   {
//     name: "Despotism",
//     id: "0x9be95f9fe6",
//   },
//   {
//     name: "Socialism",
//     id: "0x9be95f9fe7",
//   },
//   {
//     name: "Official Religion",
//     id: "0x9be95f9fe8",
//   },
//   {
//     name: "Religious State",
//     id: "0x9be95f9fe9",
//   },
//   {
//     name: "Secular State",
//     id: "0x9be95f9fea",
//   },
//   {
//     name: "Atheist State",
//     id: "0x9be95f9feb",
//   },
//   {
//     name: "Undeclared",
//     id: "0x9be95f9fec",
//   },
//   {
//     name: "State With Religion",
//     id: "0x9be95f9fed",
//   },
//   {
//     name: "Semi-Presidential",
//     id: "0x9be95f9fee",
//   },
//   {
//     name: "Directorial",
//     id: "0x9be95f9fef",
//   },
//   {
//     name: "Presidential",
//     id: "0x9be95f9ff0",
//   },
//   {
//     name: "Monarchy",
//     id: "0x9be95f9ff1",
//   },
//   {
//     name: "Parliamentary",
//     id: "0x9be95f9ff2",
//   },
//   {
//     name: "Two Party System",
//     id: "0x9be95f9ff3",
//   },
//   {
//     name: "Multi-Party System",
//     id: "0x9be95f9ff4",
//   },
//   {
//     name: "Non-Partisan System",
//     id: "0x9be95f9ff5",
//   },
//   {
//     name: "Dominant Party System",
//     id: "0x9be95f9ff6",
//   },
//   {
//     name: "Sortition",
//     id: "0x9be95f9ff7",
//   },
//   {
//     name: "Liquid Democracy",
//     id: "0x9be95f9ff8",
//   },
//   {
//     name: "Digital Democracy",
//     id: "0x9be95f9ff9",
//   },
//   {
//     name: "Liberal Democracy",
//     id: "0x9be95f9ffa",
//   },
//   {
//     name: "Census Democracy",
//     id: "0x9be95f9ffb",
//   },
//   {
//     name: "Direct Democracy",
//     id: "0x9be95f9ffc",
//   },
//   {
//     name: "Herrenvolk Democracy",
//     id: "0x9be95f9ffd",
//   },
//   {
//     name: "Representative Democracy",
//     id: "0x9be95f9ffe",
//   },
//   {
//     name: "Social Democracy",
//     id: "0x9be95f9fff",
//   },
//   {
//     name: "Soviet Democracy",
//     id: "0x9be95fa000",
//   },
//   {
//     name: "Illiberal Democracy",
//     id: "0x9be95fa001",
//   },
//   {
//     name: "Cellular Democracy",
//     id: "0x9be95fa002",
//   },
//   {
//     name: "Electocracy",
//     id: "0x9be95fa003",
//   },
//   {
//     name: "Ergatocracy",
//     id: "0x9be95fa004",
//   },
//   {
//     name: "Electoral Autocracy",
//     id: "0x9be95fa005",
//   },
//   {
//     name: "Totalitarian Democracy",
//     id: "0x9be95fa006",
//   },
//   {
//     name: "Particracy",
//     id: "0x9be95fa007",
//   },
//   {
//     name: "Stratocracy",
//     id: "0x9be95fa008",
//   },
//   {
//     name: "Synarchism",
//     id: "0x9be95fa009",
//   },
//   {
//     name: "Geniocracy",
//     id: "0x9be95fa00a",
//   },
//   {
//     name: "Kraterocracy",
//     id: "0x9be95fa00b",
//   },
//   {
//     name: "Kritarchy",
//     id: "0x9be95fa00c",
//   },
//   {
//     name: "Noocracy",
//     id: "0x9be95fa00d",
//   },
//   {
//     name: "Plutocracy",
//     id: "0x9be95fa00e",
//   },
//   {
//     name: "Theocracy",
//     id: "0x9be95fa00f",
//   },
//   {
//     name: "Aristocracy",
//     id: "0x9be95fa010",
//   },
//   {
//     name: "Meritocracy",
//     id: "0x9be95fa011",
//   },
//   {
//     name: "Technocracy",
//     id: "0x9be95fa012",
//   },
//   {
//     name: "Timocracy",
//     id: "0x9be95fa013",
//   },
//   {
//     name: "Hybrid Dictatorship",
//     id: "0x9be95fa014",
//   },
//   {
//     name: "Civilian Dictatorship",
//     id: "0x9be95fa015",
//   },
//   {
//     name: "Military Dictatorship",
//     id: "0x9be95fa016",
//   },
//   {
//     name: "Absolute Monarchy",
//     id: "0x9be95fa017",
//   },
//   {
//     name: "Constitutional Monarchy",
//     id: "0x9be95fa018",
//   },
//   {
//     name: "Crowned Republic",
//     id: "0x9be95fa019",
//   },
//   {
//     name: "Federation",
//     id: "0x9be95fa01a",
//   },
//   {
//     name: "Strong Center Federation",
//     id: "0x9be95fa01b",
//   },
//   {
//     name: "Confederation",
//     id: "0x9be95fa01c",
//   },
//   {
//     name: "Unitary",
//     id: "0x9be95fa01d",
//   },
//   {
//     name: "Government-in-exile",
//     id: "0x9be95fa02f",
//   },
//   {
//     name: "Exile Government",
//     id: "0x9be95fa030",
//   },
// ];

// (async () => {
//   const graphQLClient = await createGraphQLClient();
//   for (let n in toChangeNames) {
//     const { id, name } = toChangeNames[n];
//     try {
//       const res = await update_Name_Change_Name_Case(graphQLClient, id, name.toLowerCase());
//       console.log(res);
//       console.log("===================");
//     } catch (e) {
//       console.error(e, toChangeNames[n]);
//     }
//   }
// })();

/**
 * ADD GOVERNMENT SYSTEM FOR INDIA
 */

// let governmentSystemIndia = {
//   name_id: "india-government-system-2024",
//   description: "",

//   active_official_system_of: { name_id: "india-government" },

//   authority_status_type: [{ name_id: "sovereign" }, { name_id: "stable" }],

//   authority_source_type: [{ name_id: "people" }],

//   authority_concentration_type: [{ name_id: "democracy" }],

//   authority_distribution_type: { name_id: "strong_center_federation" },

//   democracy_type: [{ name_id: "liberal_democracy" }, { name_id: "representative_democracy" }],

//   partisan_system_type: { name_id: "multi_party_system" },

//   head_of_state_or_government_system_type: { name_id: "parliamentary" },

//   religious_ideology_type: { name_id: "secular_state" },

//   economic_system_type: [{ name_id: "capitalism" }, { name_id: "socialism" }],

//   created_on: new Date(),
// };

// (async () => {
//   const graphQLClient = await createGraphQLClient();
//   const saved = await createGovernmentSystem(graphQLClient, governmentSystemIndia);
// })();

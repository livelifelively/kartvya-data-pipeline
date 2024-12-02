import { createGraphQLClient } from "../generic/generic.utils";

// export async function upsert_Person_Wikidata_Qid(wikidata_qid: string, inputData: any = {}) {
//   const graphQLClient = await createGraphQLClient();

//   const query = `
//         query get_Person_By_Wikidata_Qid($wikidata_qid: String!) {
//           query_Person_ (filter: {
//               wikidata_qid: {eq: $wikidata_qid},
//               has: indian_politician
//           }) {
//               indian_politician {
//                   name_id
//               }
//           }
//         }`;

//   let variables: any = { name };

//   let response: any = await graphQLClient.request(query, variables);

//   console.log("MINSTRY NOT FOUNT, Inserting", name);

//   if (response.query_Name_.length) return response.query_Name_[0].indian_union_government_ministry[0].name_id;

//   const addQuery = `
//       mutation add_Indian_Union_Government_Ministry_($input: Add_Indian_Union_Government_Ministry_Input!) {
//           add_Indian_Union_Government_Ministry_ (input: [$input]) {
//               _Indian_Union_Government_Ministry_ {
//                   id
//               }
//           }
//       }
//       `;
//   variables = { input: inputData };
//   response = await graphQLClient.request(addQuery, variables);

//   return response.add_Indian_Union_Government_Ministry_._Indian_Union_Government_Ministry_.id;
// }

export async function get_Politician_By_Person_Wikidata_Qid(graphQLClient: any, wikidata_qid: string) {
  const query = `
    query get_Person_By_Wikidata_Qid($wikidata_qid: String!) {
        query_Person_ (filter: {
            wikidata_qid: {eq: $wikidata_qid},
            has: indian_politician
        }) {
            indian_politician {
                id
            }
        }
    }`;

  let variables: any = { wikidata_qid };

  let response: any = await graphQLClient.request(query, variables);

  if (response.query_Person_.length) return response.query_Person_[0].indian_politician.id;
}

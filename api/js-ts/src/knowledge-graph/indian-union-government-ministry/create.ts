import { createGraphQLClient } from "../generic/generic.utils";

export async function upsert_Indian_Union_Government_Ministry(name: string, inputData: any = {}) {
  const graphQLClient = await createGraphQLClient();

  const query = `
      query get_Indian_Union_Government_Ministry_By_Name_($name: String!) {
        query_Name_ (filter: {
            name: {eq: $name},
            has: indian_union_government_ministry
        }) {
            indian_union_government_ministry {
                name_id
            }
        }
      }`;

  let variables: any = { name };

  let response: any = await graphQLClient.request(query, variables);

  //   console.log("MINSTRY NOT FOUNT, Inserting", name);

  if (response.query_Name_.length) return response.query_Name_[0].indian_union_government_ministry[0].name_id;

  const addQuery = `
    mutation add_Indian_Union_Government_Ministry_($input: Add_Indian_Union_Government_Ministry_Input!) {
        add_Indian_Union_Government_Ministry_ (input: [$input]) {
            _Indian_Union_Government_Ministry_ {
                id
            }
        }
    }
    `;
  variables = { input: inputData };
  response = await graphQLClient.request(addQuery, variables);

  return response.add_Indian_Union_Government_Ministry_._Indian_Union_Government_Ministry_.id;
}

export async function create_Indian_Union_Government_Ministry(inputData: any) {
  const graphQLClient = await createGraphQLClient();

  const addQuery = `
      mutation add_Indian_Union_Government_Ministry_($input: Add_Indian_Union_Government_Ministry_Input!) {
          add_Indian_Union_Government_Ministry_ (input: [$input]) {
              _Indian_Union_Government_Ministry_ {
                  id
              }
          }
      }
    `;
  let variables = { input: inputData };
  let response: any = await graphQLClient.request(addQuery, variables);

  return response.add_Indian_Union_Government_Ministry_._Indian_Union_Government_Ministry_.id;
}

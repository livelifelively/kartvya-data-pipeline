import { createGraphQLClient } from "../generic/generic.utils";

export async function upsert_Name_(name: string, languageScriptNameEn: string = "english_latin") {
  const graphQLClient = await createGraphQLClient();

  // GraphQL query to check if the name exists
  const query = `
      query get_Name_($name: String!) {
        query_Name_(filter: {name: {eq: $name}}) {
          id
          name
          language_script {
            name_en
          }
        }
      }`;
  const variables = { name };

  // Perform the query
  try {
    let response: any = await graphQLClient.request(query, variables);

    const names = response.query_Name_;

    // Check if the name was found
    if (names.length > 0) {
      const nameData = names[0];
      const nameId = nameData.id;

      return nameId;
    } else {
      // Mutation to add a new name if not exists
      const addMutation = `
              mutation add_Name_($name: String!, $languageScriptNameEn: String!) {
                add_Name_(input: [{
                  name: $name,
                  language_script: [{name_en: $languageScriptNameEn}]
                }]) {
                  _Name_ {
                    id
                  }
                }
              }`;

      response = await graphQLClient.request(addMutation, { name, languageScriptNameEn });
      return response.add_Name_._Name_[0].id;
    }
  } catch (error) {
    console.error("Error in upsert_Name_:", error);
    // throw error;
  }
}

export async function update_Name_Change_Name_Case(graphQLClient: any, nameId: string, newName: string) {
  const updateMutation = `
              mutation update_Name_($nameId: ID!, $newName: String!) {
                update_Name_(input: {
                  filter: {id: [$nameId]},
                  set: {
                    name: $newName
                  }
                }) {
                  _Name_ {
                    id
                  }
                }
              }`;

  const response = await graphQLClient.request(updateMutation, { nameId, newName });
  return response.data;
}

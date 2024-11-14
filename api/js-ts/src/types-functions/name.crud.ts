import { createGraphQLClient } from '../knowledge-graph/generic/generic.utils';

interface LanguageScript {
  name_en: string;
}

interface Name {
  id: string;
  language_script: LanguageScript[];
}

export async function upsertName(name: string, languageScriptNameEn: string) {
  const graphQLClient = await createGraphQLClient();

  // GraphQL query to check if the name exists
  const query = `
    query getName($name: String!) {
      queryName(filter: {name: {eq: $name}}) {
        id
        language_script {
          name_en
        }
      }
    }`;
  const variables = { name };

  // Perform the query
  try {
    let response: any = await graphQLClient.request(query, variables);

    const names: Name[] = response.data.data.queryName;

    // Check if the name was found
    if (names.length > 0) {
      const nameData = names[0];
      const nameId = nameData.id;
      // Check if the language script is already linked
      if (nameData.language_script.some((ls) => ls.name_en === languageScriptNameEn)) {
        return nameId; // Return the existing ID without updating
      }

      // Mutation to add a new language script if not already present
      const updateMutation = `
            mutation updateName($nameId: ID!, $languageScriptNameEn: String!) {
              updateName(input: {
                filter: {id: [$nameId]},
                set: {
                  language_script: [{name_en: $languageScriptNameEn}]
                }
              }) {
                name {
                  id
                }
              }
            }`;

      response = await graphQLClient.request(updateMutation, { nameId, languageScriptNameEn });

      return response.data.data.updateName.name.id;
    } else {
      // Mutation to add a new name if not exists
      const addMutation = `
            mutation addName($name: String!, $languageScriptNameEn: String!) {
              addName(input: [{
                name: $name,
                language_script: [{name_en: $languageScriptNameEn}]
              }]) {
                name {
                  id
                }
              }
            }`;

      response = await graphQLClient.request(addMutation, { name, languageScriptNameEn });
      return response.data.data.addName.name.id;
    }
  } catch (error) {
    console.error('Error in upsertName:', error);
    // throw error;
  }
}

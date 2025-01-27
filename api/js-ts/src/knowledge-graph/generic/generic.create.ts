export async function createNodeType(nodetype: string, graphQLClient: any, nodeData: any) {
  const mutation = `
        mutation Create${nodetype}($input: Add${nodetype}Input!) {
            add${nodetype}(input: [$input]) {
                ${nodetype} {
                    id
                }
            }
        }
        `;

  const variables = {
    input: nodeData,
  };

  const response = await graphQLClient.request(mutation, variables);
  return response[`add${nodetype}`][nodetype][0].id;
  // return response;
}

export async function updateNodeType(
  nodetype: string,
  graphQLClient: any,
  input: { filter?: any; set?: any; remove?: any }
) {
  const mutation = `
        mutation Update${nodetype}($input: Update${nodetype}Input!) {
            update${nodetype}(input: $input) {
                ${nodetype} {
                    id
                }
            }
        }
        `;

  const variables = {
    input,
  };

  const response = await graphQLClient.request(mutation, variables);
  return response[`update${nodetype}`][nodetype][0].id;
}

export async function queryNodeType(nodetype: string, graphQLClient: any, idOrNameId: string, fields: string[]) {
  // Determine the variable name based on the id type
  const isNameId = typeof idOrNameId === "string" && idOrNameId.length > 0;
  const variableName = isNameId ? "name_id" : "id";

  // Construct the query
  const query = `
      query Get${nodetype}($value: String!) {
          query${nodetype}(filter: {${variableName}: {eq: $value}}) {
              ${fields.join("\n")}
          }
      }
  `;

  const variables = {
    value: idOrNameId,
  };

  try {
    const response = await graphQLClient.request(query, variables);
    return response[`query${nodetype}`] || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function deleteNodeType(nodetype: string, graphQLClient: any, ids: string[]) {
  // Construct the query
  const mutation = `
      mutation Delete${nodetype}($ids: [ID!]!) {
          delete${nodetype}(filter: {id: $ids}) {
              ${nodetype} {
                id
              }
          }
      }
  `;

  const variables = {
    ids,
  };

  try {
    const response = await graphQLClient.request(mutation, variables);
    return response[`mutation${nodetype}`] || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// export async function upsertNodeType(nodetype: string, graphQLClient: any, nodeData: any) {
//   const query = `
//     query Query${nodetype}
//   `;

//   const mutation = `
//     mutation Create${nodetype}($input: Add${nodetype}Input!) {
//         add${nodetype}(input: [$input]) {
//             ${nodetype} {
//                 id
//             }
//         }
//     }
//   `;

//   const variables = {
//     input: nodeData,
//   };

//   const response = await graphQLClient.request(mutation, variables);
//   return response[`add${nodetype}`][nodetype][0].id;
//   // return response;
// }

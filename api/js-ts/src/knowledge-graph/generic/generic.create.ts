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

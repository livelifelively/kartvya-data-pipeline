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

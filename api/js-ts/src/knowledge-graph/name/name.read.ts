// export async function read_Name_(graphQLClient: any, nameId: any) {
//   const query = `
//           query Get${nodetype}($nodeId: Add${nodetype}Input!) {
//               add${nodetype}(input: [$input]) {
//                   ${nodetype} {
//                       id
//                   }
//               }
//           }
//           `;

//   const variables = {
//     input: nodeData,
//   };

//   const response = await graphQLClient.request(mutation, variables);
//   return response[`add${nodetype}`][nodetype][0].id;
//   // return response;
// }

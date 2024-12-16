export async function createIndianUnionGovernment(graphQLClient: any, indianUnionGovernmentData: any) {
  const mutation = `
      mutation Create_Indian_Union_Government_($input: Add_Indian_Union_Government_Input!) {
          add_Indian_Union_Government_(input: [$input]) {
              _Indian_Union_Government_ {
                  id
              }
          }
      }
      `;

  const variables = {
    input: indianUnionGovernmentData,
  };

  const response = await graphQLClient.request(mutation, variables);
  return response.add_Indian_Union_Government_._Indian_Union_Government_[0].id;
}

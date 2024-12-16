export async function createName(graphQLClient: any, nameData: any) {
  const mutation = `
      mutation Create_Name_($input: Add_Name_Input!) {
          add_Name_(input: [$input]) {
              _Name_ {
                  id
                  name
              }
          }
      }
      `;

  const variables = {
    input: nameData,
  };

  const response = await graphQLClient.request(mutation, variables);
  return response.add_Name_._Name_[0].id;
}

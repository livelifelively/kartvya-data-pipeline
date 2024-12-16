export async function createGovernmentSystemType(graphQLClient: any, governmentSystemTypeData: any) {
  const mutation = `
    mutation Create_Government_System_Type_($input: Add_Government_System_Type_Input!) {
        add_Government_System_Type_(input: [$input]) {
            _Government_System_Type_ {
                id
            }
        }
    }
    `;

  const variables = {
    input: governmentSystemTypeData,
  };

  const response = await graphQLClient.request(mutation, variables);
  return response.add_Government_System_Type_._Government_System_Type_[0].id;
}

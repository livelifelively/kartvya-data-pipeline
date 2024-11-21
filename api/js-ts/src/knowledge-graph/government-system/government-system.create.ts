export async function createGovernmentSystem(graphQLClient: any, governmentSystemData: any) {
  const mutation = `
    mutation Create_Government_System_($input: Add_Government_System_Input!) {
        add_Government_System_(input: [$input]) {
            _Government_System_ {
                id
            }
        }
    }
    `;

  const variables = {
    input: governmentSystemData,
  };

  const response = await graphQLClient.request(mutation, variables);
  return response.add_Government_System_._Government_System_[0].id;
}

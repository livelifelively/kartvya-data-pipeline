export async function createCountry(graphQLClient: any, countryData: any) {
  const mutation = `
    mutation Create_Country_($input: Add_Country_Input!) {
        add_Country_(input: [$input]) {
            _Country_ {
                id
            }
        }
    }
    `;

  const variables = {
    input: countryData,
  };

  const response = await graphQLClient.request(mutation, variables);
  return response.add_Country_._Country_[0].id;
}

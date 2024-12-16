export async function createCountryGovernment(graphQLClient: any, countryGovernmentData: any) {
  const mutation = `
      mutation CreateCountry_Government_($input: Add_Country_Government_Input!) {
          add_Country_Government_(input: [$input]) {
              _Country_Government_ {
                  id
              }
          }
      }
      `;

  const variables = {
    input: countryGovernmentData,
  };

  const response = await graphQLClient.request(mutation, variables);
  return response.add_Country_Government_._Country_Government_[0].id;
}

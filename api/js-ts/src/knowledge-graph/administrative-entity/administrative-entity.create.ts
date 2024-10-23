export async function createAdministrativeEntity(graphQLClient: any, regionData: any) {
  const mutation = `
      mutation CreateAdministrativeEntity($input: AddAdministrativeEntityInput!) {
        addAdministrativeEntity(input: [$input]) {
          administrativeEntity {
            id
          }
        }
      }
    `;

  const variables = {
    input: regionData,
  };

  const response = await graphQLClient.request(mutation, variables);
  return response.addAdministrativeEntity.administrativeEntity[0].id;
}

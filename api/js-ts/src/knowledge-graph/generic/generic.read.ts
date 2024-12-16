import { createGraphQLClient, EntityDataType, evaluateVariablesForRegionType } from "./generic.utils";

export const getAdministrativeEntityRegionTypeUniqueOrIdFieldsByRegionId = async (
  regionType: string,
  regionId: string
) => {
  const graphQLClient = await createGraphQLClient();

  function joinAllFields(entityCategory: any) {
    return `${entityCategory.id.join(" ")}
    ${entityCategory.otherIdentifiers.join(" ")}
    ${entityCategory.sourceDataIds.join(" ")}`;
  }

  const { nodeType, regionNamePrefix, toFetch } = evaluateVariablesForRegionType(regionType);

  const administrativeEntity = `administrative_entity {${joinAllFields(toFetch.administrativeEntity)}}`;

  const legal = `legal {${joinAllFields(toFetch.legal)}}`;

  const query = `
        query Get${nodeType}($regionId: String!) {
          query${nodeType} (filter: {region_id: {eq: $regionId}}) {
            id
            region_id
            ${legal}
            ${administrativeEntity}
          }
        }
      `;

  const variables = {
    regionId,
  };

  try {
    const data: any = await graphQLClient.request(query, variables);
    return data[`query${nodeType}`];
  } catch (e) {
    console.error(`Error fetching ${nodeType} for region_id ${regionId}`, e);
  }
};

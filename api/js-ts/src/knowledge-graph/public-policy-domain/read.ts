import { createGraphQLClient, EntityDataType, evaluateVariablesForRegionType } from "../generic/generic.utils";

export const getPublicPolicyDomain = async (publicPolicyNameId: string, publicPolicyId: string) => {
  const graphQLClient = await createGraphQLClient();

  const query = `
        query Get_Public_Policy_Domain_($publicPolicyNameId: String!) {
          query_Public_Policy_Domain_ (filter: {name_id: {eq: $publicPolicyNameId}}) {
            id
            name_id
            names {
                name
                language_script
                case_sensitive
            }
            description
          }
        }
      `;

  const variables = {
    publicPolicyNameId,
  };

  try {
    const data: any = await graphQLClient.request(query, variables);
    return data[`query_Public_Policy_Domain_`];
  } catch (e) {
    console.error(`Error fetching query_Public_Policy_Domain_`, e);
  }
};

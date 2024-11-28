import { createGraphQLClient, EntityDataType, evaluateVariablesForRegionType } from "../generic/generic.utils";

export const addPublicPolicyDomain = async (graphQLClient: any, inputData: any) => {
  const query = `
    mutation Create_Public_Policy_Domain_($inputData: Add_Public_Policy_Domain_Input!) {
        add_Public_Policy_Domain_(input: [$inputData]) {
            _Public_Policy_Domain_ {
                id
            }
        }
    }
    `;

  const variables = {
    inputData,
  };

  try {
    const data: any = await graphQLClient.request(query, variables);
    return data[`add_Public_Policy_Domain_`];
  } catch (e) {
    console.error(`Error executing add_Public_Policy_Domain_`, e);
  }
};

export const getRegionName = async (graphQLClient: any, regionName: string) => {
  const query = `
      query GetRegionName($regionName: String!) {
        getRegionName (name: $regionName) {
          name
          name_of {
            id
            category
          }
        }
      }
    `;

  const variables = {
    regionName,
  };

  try {
    const data = await graphQLClient.request(query, variables);
    return data.getRegionName;
  } catch (e) {
    console.error('Error fetching region name:', e);
  }
};

export const getStateOrUTAdministrativeEntitiesByRegionName = async (
  graphQLClient: any,
  regionName: any,
  regionType: 'State' | 'Union_Territory'
) => {
  const query = `
    query GetRegionName($regionName: String!) {
        getRegionName (name: $regionName) @cascade {
          name
          name_of (
            filter: {
              category: {
                eq: ${regionType}
              }
            }
          ) {
            id
            category
            ${regionType.toLowerCase()}_region {
              region_id

              nation {
                region_id
              }
              zonal_council {
                region_id
              }
            }
            ${regionType.toLowerCase()}_legal {
              vehicle_code
              iso_code
            }
          }
        }
      }
  `;

  const variables = {
    regionName,
  };

  try {
    const data = await graphQLClient.request(query, variables);
    return data.getRegionName;
  } catch (e) {
    console.error('Error fetching region name:', e);
  }
};

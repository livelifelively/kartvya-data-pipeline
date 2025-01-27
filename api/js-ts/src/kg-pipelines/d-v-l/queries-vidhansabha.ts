import { deleteNodeType, queryNodeType } from "../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../knowledge-graph/generic/generic.utils";

export async function deleteAllVidhanSabhaNodesForAStateOrUT(stateNameId: string) {
  const graphQLClient = await createGraphQLClient();

  const states = await queryNodeType("_Indian_State_Union_Territory_", graphQLClient, stateNameId, [
    `
        name_id
        regions {
            name_id
            vidhansabha_constituencies {
                id
                self {
                    id
                }
                version {
                    id
                }
                geo_boundary {
                    id
                    source {
                        id
                    }
                }
            }
        }
    `,
  ]);

  const formattedStates = states.map((state: any) => {
    return {
      state_name_id: state.name_id,
      state_regions: state.regions.map((region: any) => {
        return {
          region_name_id: region?.name_id,
          vidhansabha_constituencies: region.vidhansabha_constituencies.map((vidhansabhaConstituency: any) => {
            return {
              geo: vidhansabhaConstituency?.geo_boundary?.map((geo: any) => {
                return geo?.id;
              }),
              geo_source: vidhansabhaConstituency?.geo_boundary?.map((geo: any) => {
                return geo?.source?.id;
              }),
              vs_region_id: vidhansabhaConstituency?.id,
              vs_id: vidhansabhaConstituency.self?.id,
              vs_version_id: vidhansabhaConstituency.version?.id,
            };
          }),
        };
      }),
    };
  });

  console.log(JSON.stringify(formattedStates));

  const geo_source = formattedStates
    .map((states: any) => {
      return states.state_regions.map((regions: any) => {
        return regions.vidhansabha_constituencies.map((vc: any) => {
          return vc.geo_source;
        });
      });
    })
    .flat()
    .flat()
    .flat();

  await deleteNodeType("_Source_Data_", graphQLClient, geo_source);

  const geo = formattedStates
    .map((states: any) => {
      return states.state_regions.map((regions: any) => {
        return regions.vidhansabha_constituencies.map((vc: any) => {
          return vc.geo;
        });
      });
    })
    .flat()
    .flat()
    .flat();

  await deleteNodeType("_Geo_", graphQLClient, geo);

  const vs_region_id = formattedStates
    .map((states: any) => {
      return states.state_regions.map((regions: any) => {
        return regions.vidhansabha_constituencies.map((vc: any) => {
          return vc.vs_region_id;
        });
      });
    })
    .flat()
    .flat()
    .flat();

  await deleteNodeType("_Indian_Vidhansabha_Constituency_Version_Region_", graphQLClient, vs_region_id);

  const vs_version_id = formattedStates
    .map((states: any) => {
      return states.state_regions.map((regions: any) => {
        return regions.vidhansabha_constituencies.map((vc: any) => {
          return vc.vs_version_id;
        });
      });
    })
    .flat()
    .flat()
    .flat();

  await deleteNodeType("_Indian_Vidhansabha_Constituency_Version_", graphQLClient, vs_version_id);

  const vs_id = formattedStates
    .map((states: any) => {
      return states.state_regions.map((regions: any) => {
        return regions.vidhansabha_constituencies.map((vc: any) => {
          return vc.vs_id;
        });
      });
    })
    .flat()
    .flat()
    .flat();

  await deleteNodeType("_Indian_Vidhansabha_Constituency_", graphQLClient, vs_id);
}

(async () => {
  await deleteAllVidhanSabhaNodesForAStateOrUT("in-sut-puducherry");
})();

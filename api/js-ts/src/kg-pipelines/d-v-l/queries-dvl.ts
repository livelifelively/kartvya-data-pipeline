import { deleteNodeType, queryNodeType } from "../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../knowledge-graph/generic/generic.utils";

import vidhansabhaConstituencies from "./vidhansabha-seats.json";

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

export async function deleteAllLokSabhaNodesForAStateOrUT(stateNameId: string) {
  const graphQLClient = await createGraphQLClient();

  const states = await queryNodeType("_Indian_State_Union_Territory_", graphQLClient, stateNameId, [
    `
        name_id
        regions {
            name_id
            loksabha_constituencies {
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
          loksabha_constituencies: region.loksabha_constituencies.map((loksabhaConstituency: any) => {
            return {
              geo: loksabhaConstituency?.geo_boundary?.map((geo: any) => {
                return geo?.id;
              }),
              geo_source: loksabhaConstituency?.geo_boundary?.map((geo: any) => {
                return geo?.source?.id;
              }),
              vs_region_id: loksabhaConstituency?.id,
              vs_id: loksabhaConstituency.self?.id,
              vs_version_id: loksabhaConstituency.version?.id,
            };
          }),
        };
      }),
    };
  });

  // console.log(JSON.stringify(formattedStates));

  const geo_source = formattedStates
    .map((states: any) => {
      return states.state_regions.map((regions: any) => {
        return regions.loksabha_constituencies.map((vc: any) => {
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
        return regions.loksabha_constituencies.map((vc: any) => {
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
        return regions.loksabha_constituencies.map((vc: any) => {
          return vc.vs_region_id;
        });
      });
    })
    .flat()
    .flat()
    .flat();

  await deleteNodeType("_Indian_Loksabha_Constituency_Version_Region_", graphQLClient, vs_region_id);

  const vs_version_id = formattedStates
    .map((states: any) => {
      return states.state_regions.map((regions: any) => {
        return regions.loksabha_constituencies.map((vc: any) => {
          return vc.vs_version_id;
        });
      });
    })
    .flat()
    .flat()
    .flat();

  await deleteNodeType("_Indian_Loksabha_Constituency_Version_", graphQLClient, vs_version_id);

  const vs_id = formattedStates
    .map((states: any) => {
      return states.state_regions.map((regions: any) => {
        return regions.loksabha_constituencies.map((vc: any) => {
          return vc.vs_id;
        });
      });
    })
    .flat()
    .flat()
    .flat();

  await deleteNodeType("_Indian_Loksabha_Constituency_", graphQLClient, vs_id);
}

(async () => {
  // let states = [
  //   "in-sut-kerala",
  //   "in-sut-himachal-pradesh",
  //   "in-sut-meghalaya",
  //   "in-sut-jharkhand",
  //   "in-sut-chhattisgarh",
  //   "in-sut-bihar",
  //   "in-sut-goa",
  //   "in-sut-maharashtra",
  //   "in-sut-uttar-pradesh",
  //   "in-sut-west-bengal",
  //   "in-sut-nagaland",
  //   "in-sut-rajasthan",
  //   "in-sut-arunachal-pradesh",
  //   "in-sut-manipur",
  //   "in-sut-telangana",
  //   "in-sut-sikkim",
  //   "in-sut-gujarat",
  //   "in-sut-assam",
  //   "in-sut-tamil-nadu",
  //   "in-sut-punjab",
  //   "in-sut-haryana",
  //   "in-sut-odisha",
  //   "in-sut-madhya-pradesh",
  //   "in-sut-uttarakhand",
  //   "in-sut-karnataka",
  //   "in-sut-andhra-pradesh",
  //   "in-sut-mizoram",
  //   "in-sut-tripura",
  //   "in-sut-andaman-nicobar-islands",
  //   "in-sut-chandigarh",
  //   "in-sut-dadra-nagar-haveli-daman-diu",
  //   "in-sut-delhi",
  //   "in-sut-jammu-kashmir",
  //   "in-sut-ladakh",
  //   "in-sut-lakshadweep",
  //   "in-sut-puducherry",
  // ];
  // let baseObject: any = [];
  // for (let state_name_id of states) {
  //   const state = vidhansabhaConstituencies.find((val) => val.name_id === state_name_id);
  //   if (state) {
  //     const { name, name_id, wikipedia_page, vehicle_code } = state;
  //     baseObject.push({
  //       name,
  //       name_id,
  //       wikipedia_page,
  //       vehicle_code,
  //     });
  //   }
  // }
  // console.log(JSON.stringify(baseObject));

  deleteAllVidhanSabhaNodesForAStateOrUT("in-sut-maharashtra");
})();

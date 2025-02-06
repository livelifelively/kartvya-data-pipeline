// select state
// fetch ls region data for that state
// fetch vs region data for that state
// fetch d region data for that state
// geo compare
// copy to file

import { forEach, get } from "lodash";
import path from "path";
import fs from "fs";
import { queryNodeType, updateNodeType } from "../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../knowledge-graph/generic/generic.utils";
import { geoCompare } from "./dvl-geo";

async function fetchActiveDistrictsRegions(graphQLClient: any, stateNameId: string) {
  const stateDistricts = await queryNodeType("_Indian_State_Union_Territory_", graphQLClient, stateNameId, [
    `
            name_id
            active_version {
                region {
                    name_id
                    districts {
                        self {
                            name_id
                            wikidata_qid
                            
                            names {
                                name
                            }
                            active_version {
                                region {
                                    name_id
                                    geo_boundary {
                                      source {
                                        source_data
                                      }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `,
  ]);

  const activeDistricts = get(stateDistricts, "[0].active_version.region.districts");

  const features = activeDistricts.map((district: any) => {
    return {
      type: "Feature",
      geometry: JSON.parse(district?.self.active_version.region.geo_boundary[0].source.source_data)?.geometry,
      properties: {
        name_id: district?.self.active_version?.region.name_id,
        name: district.self.names[0].name,
        // region_id: district?.self.active_version?.region.name_id,
        wikidata_qid: district?.self.wikidata_qid,
      },
    };
  });

  return {
    type: "FeatureCollection",
    features,
  };
}

async function fetchActiveVidhansabhaConstituenciesRegions(graphQLClient: any, stateNameId: string) {
  const stateVidhansabhaConstituencies = await queryNodeType(
    "_Indian_State_Union_Territory_",
    graphQLClient,
    stateNameId,
    [
      `
              name_id
              active_version {
                  region {
                      name_id
                      vidhansabha_constituencies {
                          self {
                              name_id
                              wikidata_qid
                              names {
                                  name
                              }
                              active_version {
                                  region {
                                      name_id
                                      geo_boundary {
                                        source {
                                          source_data
                                        }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          `,
    ]
  );

  const activeVidhansabhaConstituencies = get(
    stateVidhansabhaConstituencies,
    "[0].active_version.region.vidhansabha_constituencies"
  );

  const features = activeVidhansabhaConstituencies.map((vidhansabha_constituency: any) => {
    return {
      type: "Feature",
      geometry: JSON.parse(vidhansabha_constituency?.self.active_version.region.geo_boundary[0].source.source_data)
        ?.geometry,
      properties: {
        name_id: vidhansabha_constituency?.self.active_version?.region.name_id,
        name: vidhansabha_constituency.self.names[0].name,
        // region_id: vidhansabha_constituency?.self.active_version?.region.name_id,
        wikidata_qid: vidhansabha_constituency?.self.wikidata_qid,
      },
    };
  });

  return {
    type: "FeatureCollection",
    features,
  };
}

async function fetchActiveLoksabhaConstituenciesRegions(graphQLClient: any, stateNameId: string) {
  const stateLoksabhaConstituencies = await queryNodeType(
    "_Indian_State_Union_Territory_",
    graphQLClient,
    stateNameId,
    [
      `
                name_id
                active_version {
                    region {
                        name_id
                        loksabha_constituencies {
                            self {
                                name_id
                                wikidata_qid
                                names {
                                    name
                                }
                                active_version {
                                    region {
                                        name_id
                                        geo_boundary {
                                          source {
                                            source_data
                                          }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `,
    ]
  );

  const activeLoksabhaConstituencies = get(
    stateLoksabhaConstituencies,
    "[0].active_version.region.loksabha_constituencies"
  );

  const features = activeLoksabhaConstituencies.map((loksabha_constituency: any) => {
    return {
      type: "Feature",
      geometry: JSON.parse(loksabha_constituency?.self.active_version.region.geo_boundary[0].source.source_data)
        ?.geometry,
      properties: {
        name_id: loksabha_constituency?.self.active_version?.region.name_id,
        name: loksabha_constituency.self.names[0].name,
        // region_id: loksabha_constituency?.self.active_version?.region.name_id,
        wikidata_qid: loksabha_constituency?.self.wikidata_qid,
      },
    };
  });

  return {
    type: "FeatureCollection",
    features,
  };
}

async function geoCompareLoksabhaConstituenciesDistricts(graphQLClient: any, stateNameId: string) {
  const districtsGeo = await fetchActiveDistrictsRegions(graphQLClient, stateNameId);
  //   console.log(districtsGeo);

  const loksabhaConstituenciesGeo = await fetchActiveLoksabhaConstituenciesRegions(graphQLClient, stateNameId);
  //   console.log(loksabhaConstituenciesGeo);

  await geoCompare(loksabhaConstituenciesGeo, districtsGeo);
}

async function geoCompareDistrictsVidhansabhaConstituencies(graphQLClient: any, stateNameId: string) {
  const districtsGeo = await fetchActiveDistrictsRegions(graphQLClient, stateNameId);
  //   console.log(districtsGeo);

  const vidhansabhaConstituenciesGeo = await fetchActiveVidhansabhaConstituenciesRegions(graphQLClient, stateNameId);
  //   console.log(vidhansabhaConstituencies);

  await geoCompare(districtsGeo, vidhansabhaConstituenciesGeo);
}

async function geoCompareLoksabhaConstituenciesVidhansabhaConstituencies(graphQLClient: any, stateNameId: string) {
  const vidhansabhaConstituenciesGeo = await fetchActiveVidhansabhaConstituenciesRegions(graphQLClient, stateNameId);
  //   console.log(vidhansabhaConstituencies);

  const loksabhaConstituenciesGeo = await fetchActiveLoksabhaConstituenciesRegions(graphQLClient, stateNameId);
  //   console.log(loksabhaConstituenciesGeo);

  await geoCompare(loksabhaConstituenciesGeo, vidhansabhaConstituenciesGeo);
}

async function updateVidhansabhaConstituencyRegionAddDistrict(
  graphQLClient: any,
  vidhansabhaConstituencyRegionNameId: string,
  districtsRegionNameId: string[]
) {
  const id = await updateNodeType("_Indian_Vidhansabha_Constituency_Version_Region_", graphQLClient, {
    filter: { name_id: { eq: vidhansabhaConstituencyRegionNameId } },
    set: {
      districts: districtsRegionNameId.map((val) => ({ name_id: val })),
    },
  });
  console.log(id);
}

async function updateDistrictRegionAddLoksabhaConstituency(
  graphQLClient: any,
  districtsRegionNameId: string,
  loksabhaConstituencyRegionNameId: string[]
) {
  const id = await updateNodeType("_Indian_District_Version_Region_", graphQLClient, {
    filter: { name_id: { eq: districtsRegionNameId } },
    set: {
      loksabha_constituencies: loksabhaConstituencyRegionNameId.map((val) => ({ name_id: val })),
    },
  });
  console.log(id);
}

async function updateVidhansabhaConstituencyRegionAddLoksabhaConstituency(
  graphQLClient: any,
  vidhansabhaConstituencyRegionNameId: string,
  loksabhaConstituencyRegionNameId: string[]
) {
  const id = await updateNodeType("_Indian_Vidhansabha_Constituency_Version_Region_", graphQLClient, {
    filter: { name_id: { eq: vidhansabhaConstituencyRegionNameId } },
    set: {
      loksabha_constituencies: loksabhaConstituencyRegionNameId.map((val) => ({ name_id: val })),
    },
  });
  console.log(id);
}

(async () => {
  const graphQLClient = await createGraphQLClient();

  const stateNameId = "in-sut-himachal-pradesh";
  //   const stateNameId = "in-sut-punjab";

  const districtLoksabhaConstituencyFilePath = path.join(__dirname, stateNameId.split("in-sut-")[1], "d-lc.json");
  const vidhansabhaConstituencyDistrictFilePath = path.join(__dirname, stateNameId.split("in-sut-")[1], "d-vc.json");
  const vidhansabhaConstituencyLoksabhaConstituencyFilePath = path.join(
    __dirname,
    stateNameId.split("in-sut-")[1],
    "lc-vc.json"
  );

  const districtLoksabhaConstituency = JSON.parse(fs.readFileSync(districtLoksabhaConstituencyFilePath, "utf8"));
  const vidhansabhaConstituencyDistrict = JSON.parse(fs.readFileSync(vidhansabhaConstituencyDistrictFilePath, "utf8"));
  const vidhansabhaConstituencyLoksabhaConstituency = JSON.parse(
    fs.readFileSync(vidhansabhaConstituencyLoksabhaConstituencyFilePath, "utf8")
  );

  for (let dlc in districtLoksabhaConstituency) {
    await updateDistrictRegionAddLoksabhaConstituency(graphQLClient, dlc, districtLoksabhaConstituency[dlc]);
  }

  for (let dvc in vidhansabhaConstituencyDistrict) {
    await updateVidhansabhaConstituencyRegionAddDistrict(graphQLClient, dvc, vidhansabhaConstituencyDistrict[dvc]);
  }

  for (let vclc in vidhansabhaConstituencyLoksabhaConstituency) {
    await updateVidhansabhaConstituencyRegionAddLoksabhaConstituency(
      graphQLClient,
      vclc,
      vidhansabhaConstituencyLoksabhaConstituency[vclc]
    );
  }
})();

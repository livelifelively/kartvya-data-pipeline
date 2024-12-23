import { groupBy, reduce } from "lodash";
import { updateNodeType } from "../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../knowledge-graph/generic/generic.utils";

export function keyByURLDistrictsVidhansabhaLoksabha(outputs: Record<string, any>) {
  const {
    districtsPreparedOrAndSavedToKG,
    loksabhaConstituenciesPreparedOrAndSavedToKG,
    vidhansabhaConstituenciesPreparedOrAndSavedToKG,
  } = outputs;

  const districtsKeyedByIdURL = districtsPreparedOrAndSavedToKG.reduce((agg: any, val: any) => {
    val.id_url.forEach((v: any) => {
      agg[v] = val;
    });

    return agg;
  }, {});

  const loksabhaConstituenciesKeyedByIdURL = loksabhaConstituenciesPreparedOrAndSavedToKG.reduce(
    (agg: any, val: any) => {
      val.id_url.forEach((v: any) => {
        agg[v] = val;
      });

      return agg;
    },
    {}
  );

  const vidhansabhaConstituenciesKeyedByIdURL = vidhansabhaConstituenciesPreparedOrAndSavedToKG.reduce(
    (agg: any, val: any) => {
      val.id_url.forEach((v: any) => {
        agg[v] = val;
      });

      return agg;
    },
    {}
  );

  return { districtsKeyedByIdURL, vidhansabhaConstituenciesKeyedByIdURL, loksabhaConstituenciesKeyedByIdURL };
}

export async function prepareVidhansabhaToDistrictsAndLoksabha(outputs: Record<string, any>) {
  const {
    loksabhaConstituenciesKeyedByIdURL,
    districtsKeyedByIdURL,
    vidhansabhaConstituenciesKeyedByIdURL,
    stateVCsData,
  } = outputs;
  // iterate over dvl list, introduce name_ids
  const vcnameIds = stateVCsData.map((val: any) => {
    return {
      vc_name_id: vidhansabhaConstituenciesKeyedByIdURL[val.vidhansabha_constituency_wikipedia_page].name_id,
      vc_wiki: vidhansabhaConstituenciesKeyedByIdURL[val.vidhansabha_constituency_wikipedia_page].wikipedia_page,
      d_name_id: districtsKeyedByIdURL[val.district_wikipedia_page].name_id,
      lc_name_id: loksabhaConstituenciesKeyedByIdURL[val.loksabha_constituency_wikipedia_page].name_id,
    };
  });

  // console.log(vcnameIds);

  return { vcnameIds };
}

export async function saveConnectVidhansabhaToDistrictsAndLoksabhas(outputs: Record<string, any>) {
  const { vcnameIds } = outputs;
  const graphQLClient = await createGraphQLClient();

  let allVidhansabhaUpdateConfigs = [];
  for (let vcId of vcnameIds) {
    const updateConfig = {
      filter: { name_id: { eq: vcId.vc_name_id } },
      set: {
        districts: [{ name_id: vcId.d_name_id }],
        loksabha_constituencies: [{ name_id: vcId.lc_name_id }],
      },
    };

    const id = await updateNodeType("_Indian_Vidhansabha_Constituency_", graphQLClient, updateConfig);
    allVidhansabhaUpdateConfigs.push({ ...updateConfig, updatedNodeId: id });
  }
}

export async function prepareLoksabhaToDistrictsAndVidhansabha(outputs: Record<string, any>) {
  const { vcnameIds } = outputs;

  const lcNameIds = groupBy(vcnameIds, "lc_name_id");

  const lcNameIdsConnections = reduce(
    lcNameIds,
    (agg: any, val: any, key: any) => {
      const vcs: any = {};
      const ds: any = {};

      val.forEach((v: any) => {
        vcs[v.vc_name_id] = true;
        ds[v.d_name_id] = true;
      });

      agg[key] = {
        self: key,
        vcs: Object.keys(vcs),
        ds: Object.keys(ds),
      };

      return agg;
    },
    {}
  );

  return { lcNameIdsConnections };
}

export async function saveConnectLoksabhaToDistrictsAndVidhansabhas(outputs: Record<string, any>) {
  const { lcNameIdsConnections } = outputs;
  const graphQLClient = await createGraphQLClient();

  let allLoksabhaUpdateConfigs: any = [];
  for (let lcId in lcNameIdsConnections) {
    const updateConfig = {
      filter: { name_id: { eq: lcNameIdsConnections[lcId].self } },
      set: {
        districts: lcNameIdsConnections[lcId].ds.map((val: any) => {
          return { name_id: val };
        }),
        vidhansabha_constituencies: lcNameIdsConnections[lcId].vcs.map((val: any) => {
          return { name_id: val };
        }),
      },
    };

    const id = await updateNodeType("_Indian_Loksabha_Constituency_", graphQLClient, updateConfig);

    allLoksabhaUpdateConfigs.push({ ...updateConfig, updatedNodeId: id });
  }

  return {
    allLoksabhaUpdateConfigs,
  };
}

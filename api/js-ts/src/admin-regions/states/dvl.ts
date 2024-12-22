import path from "path";

import {
  addLoksabhaConstituencyDataToKnowledgeGraph,
  fetchLoksabhaConstituenciesWikiDetails,
  fetchLoksabhaConstituencyECIGeoFeatures,
  fetchStateLoksabhaConstituencies,
  transformLoksabhaConstituenciesWikipediaData,
  transformLoksabhaConstituenciesWithECIGeo,
} from "../../pipeline/loksabha-pipeline";
import { PipelineStep, runPipeline } from "../../pipeline/pipeline";
import { statesUTsVDL } from "../../source-wikipedia/d-vc-lc.v3";
import { groupBy, map, uniqWith, isEqual, reduce, forEach, keyBy } from "lodash";
import {
  addVidhansabhaConstituencyDataToKnowledgeGraph,
  fetchStateVidhansabhaConstituencies,
  fetchVidhansabhaConstituenciesWikiDetails,
  fetchVidhansabhaConstituencyECIGeoFeatures,
  transformVidhansabhaConstituenciesWikipediaData,
  transformVidhansabhaConstituenciesWithECIGeo,
} from "../../pipeline/vidhansabha-pipeline";
import {
  addDistrictDataToKnowledgeGraph,
  fetchDistrictSOIGeoFeatures,
  fetchDistrictsOSMDetails,
  fetchDistrictsOSMRelationIds,
  fetchDistrictsWikiDetails,
  fetchStateDistricts,
  fetchStateOSMData,
  transformDistrictsWikipediaData,
  transformDistrictsWithOSM,
  transformDistrictsWithSOIGeo,
} from "../../pipeline/districts-pipeline";

import { stateDistrictsList } from "../districts/state-wise-districts-count-list-urls";
import { stateLoksabhaConstituenciesCountList } from "../loksabha/state-wise-loksabha-constituencies-count-list-urls";
import { createGraphQLClient } from "../../knowledge-graph/generic/generic.utils";
import { updateNodeType } from "../../knowledge-graph/generic/generic.create";
import { statesAndUnionTerritories } from "../states-data/update-states";

// {
//   "vidhansabha_constituency_number": "1",
//   "vidhansabha_constituency_name": "Lumla",
//   "vidhansabha_constituency_wikipedia_page": "https://en.wikipedia.org/wiki/Lumla_Assembly_constituency",
//   "district_name": "Tawang",
//   "district_wikipedia_page": "https://en.wikipedia.org/wiki/Tawang_district",
//   "loksabha_constituency_name": "Arunachal West",
//   "loksabha_constituency_wikipedia_page": "https://en.wikipedia.org/wiki/Arunachal_West_Lok_Sabha_constituency",
//   "electors": {
//     "year": "2024",
//     "text": "9,917"
//   },
//   "reservation": "ST"
// }

function getDistrictsByURL(stateUT: any, dataVDL: any) {
  let d: any = [];
  dataVDL.forEach((val: any) => {
    d.push({
      name: val.district_name,
      wikipedia_page: val.district_wikipedia_page,
    });
  });

  let dGroupedByURL = groupBy(d, "wikipedia_page");

  // remove duplicate values
  dGroupedByURL = reduce(
    dGroupedByURL,
    (agg: any, val: any, idx: any) => {
      agg[idx] = uniqWith(val, isEqual);
      return agg;
    },
    {}
  );

  let dGroupedByNames = groupBy(Object.values(dGroupedByURL).flat, "name");
  let withSameName: any = [];
  forEach(dGroupedByNames, (val: any, key: string) => {
    if (val.length > 1) withSameName.push(val);
  });
  if (withSameName.length) console.log("DISTRICTS WITH COMMON NAMES", JSON.stringify(withSameName, null, 2));

  // merge values with same url but different names
  dGroupedByURL = reduce(
    dGroupedByURL,
    (agg: any, val: any, idx: any) => {
      agg[idx] = val.reduce((agg1: any, val1: any) => {
        agg1.names = agg1.names || [];
        agg1.names.push(val1.name);
        agg1.wikipedia_page = val1.wikipedia_page;

        return agg1;
      }, {});
      return agg;
    },
    {}
  );

  if (stateUT.districtsCount && Object.values(dGroupedByURL).flat().length !== stateUT.districtsCount) {
    console.log(
      "DISTRICTS COUNT MISMATCH",
      ` should be ${stateUT.districtsCount}`,
      ` is ${Object.values(dGroupedByURL).flat().length}`
    );
  }
  console.log("=====================");

  return dGroupedByURL;
}

function getVidhansabhaConstituenciesList(stateUT: any, dataVDL: any) {
  let vGroupedByNames = groupBy(dataVDL, "vidhansabha_constituency_name");

  let withSameName: any = [];
  forEach(vGroupedByNames, (val: any, key: string) => {
    if (val.length > 1) withSameName.push(val);
  });
  if (withSameName.length) console.log("VIDHAN SABHA WITH COMMON NAMES", JSON.stringify(withSameName, null, 2));

  let v = dataVDL.map((val: any) => {
    return {
      constituency_number: val.vidhansabha_constituency_number,
      names: [val.vidhansabha_constituency_name],
      wikipedia_page: val.vidhansabha_constituency_wikipedia_page,
      reservation: val.reservation,
    };
  });

  if (v.length !== stateUT.vidhansabhaConstituenciesCount) {
    console.log("VIDHANSABHA COUNT MISMATCH", ` should be ${stateUT.districtsCount}`, ` is ${v.length}`);
  }

  return v;
}

function getLoksabhaConstituenciesByURL(stateUT: any, dataVDL: any) {
  let l: any = [];
  dataVDL.forEach((val: any) => {
    l.push({
      name: val.loksabha_constituency_name,
      wikipedia_page: val.loksabha_constituency_wikipedia_page,
    });
  });

  let lGroupedByURL = groupBy(l, "wikipedia_page");

  // remove duplicate values
  lGroupedByURL = reduce(
    lGroupedByURL,
    (agg: any, val: any, idx: any) => {
      agg[idx] = uniqWith(val, isEqual);
      return agg;
    },
    {}
  );

  let lGroupedByNames = groupBy(Object.values(lGroupedByURL).flat, "name");
  let withSameName: any = [];
  forEach(lGroupedByNames, (val: any, key: string) => {
    if (val.length > 1) withSameName.push(val);
  });
  if (withSameName.length) console.log("LOK SABHA WITH COMMON NAMES", JSON.stringify(withSameName, null, 2));

  // merge values with same url but different names
  lGroupedByURL = reduce(
    lGroupedByURL,
    (agg: any, val: any, idx: any) => {
      agg[idx] = val.reduce((agg1: any, val1: any) => {
        agg1.names = agg1.names || [];
        agg1.names.push(val1.name);
        agg1.wikipedia_page = val1.wikipedia_page;

        return agg1;
      }, {});
      return agg;
    },
    {}
  );

  if (
    stateUT.loksabhaConstituenciesCount &&
    Object.values(lGroupedByURL).flat().length !== stateUT.loksabhaConstituenciesCount
  ) {
    console.log(
      "LOKSABHA CONSTITUENCIES COUNT MISMATCH",
      ` should be ${stateUT.loksabhaConstituenciesCount}`,
      ` is ${Object.values(lGroupedByURL).flat().length}`
    );
  }
  console.log("=====================");

  return lGroupedByURL;
}

async function loksabhaConstituenciesPipeline(stateUT: any, loksabhaConstituenciesList: any) {
  // console.log("LOKSABHA PROCESSING INITIALIZED: ", stateUT.name);
  const steps: PipelineStep[] = [
    // // DONT NEED THIS STEP, ALREADY INPUT IS IN THE REQUIRED FORMAT
    // {
    //   name: "Fetch State Loksabha_Constituency",
    //   function: fetchStateLoksabhaConstituencies,
    //   key: "STATE_LOKSABHA_LIST",
    //   input: stateUT,
    // },
    {
      name: "Fetch Loksabha_Constituency Wiki Details",
      function: fetchLoksabhaConstituenciesWikiDetails,
      key: "STATE_LOKSABHA_CONSTITUENCY_WIKI_DATA",
      input: null, // Will be set after the first step
    },
    {
      name: "Fetch LoksabhaConstituency ECI Geo Features",
      function: fetchLoksabhaConstituencyECIGeoFeatures,
      key: "STATE_LOKSABHA_CONSTITUENCY_ECI_GEO_DATA",
      input: stateUT,
    },
    {
      name: "Append Wikipedia Data",
      function: transformLoksabhaConstituenciesWikipediaData,
      input: null, // Will be set after the fifth step
      key: "APPEND_WIKIPEDIA_DATA_TRANSFORM_STATE_LOKSABHA_CONSTITUENCY_DATA",
    },
    {
      name: "Transform Loksabha_Constituency with ECI Geo",
      function: transformLoksabhaConstituenciesWithECIGeo,
      input: null, // Will be set after the sixth and seventh steps
      key: "APPEND_ECI_DATA_TRANSFORM_STATE_LOKSABHA_CONSTITUENCY_DATA",
    },
    // {
    //   name: "Save Loksabha_Constituency to KnowledgeGraph",
    //   function: addLoksabhaConstituencyDataToKnowledgeGraph,
    //   input: null,
    //   key: "SAVE_DISTRICT_DATA_TO_KNOWLEDGE_GRAPH",
    // },
  ];
  let outputs: Record<string, any> = {
    stateUT,
    // loksabhaConstituenciesList,
    stateLoksabhaConstituencies: loksabhaConstituenciesList,
    loksabhaConstituenciesCount: 0,
    loksabhaConstituenciesWikiDetails: [],
    loksabhaConstituenciesWikiDetailsFailed: [],
    loksabhaConstituencyFeaturesECI: [],
    transformedLoksabhaConstituenciesWikipedia: [],
    loksabhaConstituenciesNotTransformedWikipedia: [],
    transformedLoksabhaConstituenciesECIGeo: [],
    unmatchedLoksabhaConstituenciesECIGeo: [],
  };
  const loksabhaConstituenciesProgressDir = path.join(
    __dirname,
    stateUT.name_id.split("in-sut-")[1],
    "loksabha-constituency-pipeline-logs"
  );
  const progressStatusFile = path.join(loksabhaConstituenciesProgressDir, "progressStatus.json");

  try {
    const lastStepOutput = await runPipeline(steps, outputs, loksabhaConstituenciesProgressDir, progressStatusFile);
    return lastStepOutput;
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

async function vidhansabhaConstituenciesPipeline(stateUT: any, vidhansabhaConstituenciesList: any) {
  console.log("VIDHANSABHA PROCESSING INITIALIZED: ", stateUT.name);

  const steps: PipelineStep[] = [
    // {
    //   name: "Fetch State Vidhansabha_Constituency",
    //   function: fetchStateVidhansabhaConstituencies,
    //   key: "STATE_VIDHANSABHA_LIST",
    //   input: stateUT,
    // },
    {
      name: "Fetch Vidhansabha_Constituency Wiki Details",
      function: fetchVidhansabhaConstituenciesWikiDetails,
      key: "STATE_VIDHANSABHA_CONSTITUENCY_WIKI_DATA",
      input: null, // Will be set after the first step
    },
    {
      name: "Fetch VidhansabhaConstituency ECI Geo Features",
      function: fetchVidhansabhaConstituencyECIGeoFeatures,
      key: "STATE_VIDHANSABHA_CONSTITUENCY_ECI_GEO_DATA",
      input: stateUT,
    },
    {
      name: "Append Wikipedia Data",
      function: transformVidhansabhaConstituenciesWikipediaData,
      input: null, // Will be set after the fifth step
      key: "APPEND_WIKIPEDIA_DATA_TRANSFORM_STATE_VIDHANSABHA_CONSTITUENCY_DATA",
    },
    {
      name: "Transform Vidhansabha_Constituency with ECI Geo",
      function: transformVidhansabhaConstituenciesWithECIGeo,
      input: null, // Will be set after the sixth and seventh steps
      key: "APPEND_ECI_DATA_TRANSFORM_STATE_VIDHANSABHA_CONSTITUENCY_DATA",
    },
    // {
    //   name: "Save Vidhansabha_Constituency to KnowledgeGraph",
    //   function: addVidhansabhaConstituencyDataToKnowledgeGraph,
    //   input: null,
    //   key: "SAVE_DISTRICT_DATA_TO_KNOWLEDGE_GRAPH",
    // },
  ];

  let outputs: Record<string, any> = {
    stateUT,
    vidhansabhaConstituenciesList,
    stateVidhansabhaConstituencies: vidhansabhaConstituenciesList,
    vidhansabhaConstituenciesCount: 0,
    vidhansabhaConstituenciesWikiDetails: [],
    vidhansabhaConstituenciesWikiDetailsFailed: [],
    vidhansabhaConstituencyFeaturesECI: [],
    transformedVidhansabhaConstituenciesWikipedia: [],
    vidhansabhaConstituenciesNotTransformedWikipedia: [],
    transformedVidhansabhaConstituenciesECIGeo: [],
    unmatchedVidhansabhaConstituenciesECIGeo: [],
  };

  const vidhansabhaConstituenciesProgressDir = path.join(
    __dirname,
    stateUT.name_id.split("in-sut-")[1],
    "vidhansabha-constituency-pipeline-logs"
  );
  const progressStatusFile = path.join(vidhansabhaConstituenciesProgressDir, "progressStatus.json");

  try {
    const lastStepOutput = await runPipeline(steps, outputs, vidhansabhaConstituenciesProgressDir, progressStatusFile);
    return lastStepOutput;
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

async function districtsPipeline(stateUT: any, districtsList: any) {
  console.log("DISTRICTS PROCESSING INITIALIZED: ", stateUT.name);

  const steps: PipelineStep[] = [
    {
      name: "Fetch State Districts",
      function: fetchStateDistricts,
      key: "STATE_DISTRICTS_LIST",
      input: null,
    },
    {
      name: "Fetch State OSM Data",
      function: fetchStateOSMData,
      key: "STATE_OSM_DATA",
      input: null,
    },
    {
      name: "Fetch Districts OSM Relation IDs",
      function: fetchDistrictsOSMRelationIds,
      key: "STATE_DISTRICTS_OSM_RELATION_IDS",
      input: null, // Will be set after the second step
    },
    {
      name: "Fetch Districts OSM Details",
      function: fetchDistrictsOSMDetails,
      key: "STATE_DISTRICTS_OSM_RELATION_IDS",

      input: null, // Will be set after the third step
    },
    {
      name: "Fetch Districts Wiki Details",
      function: fetchDistrictsWikiDetails,
      key: "STATE_DISTRICTS_WIKI_DATA",
      input: null, // Will be set after the first step
    },
    {
      name: "Fetch District SOI Geo Features",
      function: fetchDistrictSOIGeoFeatures,
      key: "STATE_DISTRICTS_SOI_GEO_DATA",
      input: null,
    },
    {
      name: "Append Wikipedia Data",
      function: transformDistrictsWikipediaData,
      input: null, // Will be set after the fifth step
      key: "APPEND_WIKIPEDIA_DATA_TRANSFORM_STATE_DISTRICTS_DATA",
    },
    {
      name: "Transform Districts with OSM",
      function: transformDistrictsWithOSM,
      input: null, // Will be set after the fourth and seventh steps
      key: "APPEND_OSM_DATA_TRANSFORM_STATE_DISTRICTS_DATA",
    },
    {
      name: "Transform Districts with SOI Geo",
      function: transformDistrictsWithSOIGeo,
      input: null, // Will be set after the sixth and seventh steps
      key: "APPEND_SOI_DATA_TRANSFORM_STATE_DISTRICTS_DATA",
    },
    // {
    //   name: "Save Districts to KnowledgeGraph",
    //   function: addDistrictDataToKnowledgeGraph,
    //   input: null,
    //   key: "SAVE_DISTRICT_DATA_TO_KNOWLEDGE_GRAPH",
    // },
  ];

  let outputs: Record<string, any> = {
    stateUT,
    districtsList,
    districtsCount: 0,
    districts: [],
    state_union_territory_id: "",
    state_union_territory_osm_id: "",
    state_osm_data: {},
    districtsRelationIds: {},
    osmDistrictsCount: 0,
    districtsOSMDetails: [],
    districtsOSMDetailsNotFound: [],
    osmDetailsDistrictsCount: 0,
    districtsWikiDetails: [],
    districtsWikiDetailsFailed: [],
    districtFeaturesSOI: [],
    transformedDistrictsWikipedia: [],
    districtsNotTransformedWikipedia: [],
    fullMatchDistrictsOSMWiki: [],
    partialMatchDistrictsOSMWiki: [],
    allMatchedDistrictsOSMWiki: [],
    matchDistrictsOSMWikiStatistics: {},
    unmatchedDistrictsOSMWiki: [],
    transformedDistrictsSOIGeo: [],
    unmatchedDistrictsSOIGeo: [],
  };

  const districtsProgressDir = path.join(__dirname, stateUT.name_id.split("in-sut-")[1], "district-pipeline-logs");
  const progressStatusFile = path.join(districtsProgressDir, "progressStatus.json");

  try {
    const lastStepOutput = await runPipeline(steps, outputs, districtsProgressDir, progressStatusFile);
    return lastStepOutput;
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

(async () => {
  const extraStateDetailsByNameId = keyBy(statesAndUnionTerritories, "name_id");
  let state: any = statesUTsVDL[0];

  let stateUT: any = {
    name: state.state_name,
    name_id: state.name_id,
    vehicle_code: extraStateDetailsByNameId[state.name_id].vehicle_code,
    vidhansabhaConstituenciesCount: state.count,
  };
  console.log("INNITATING PROCESSING OF STATE ", stateUT.name);

  const stateLoksabhaConstituencies = stateLoksabhaConstituenciesCountList.find(
    (val: any) => val.stateNameId === stateUT.name_id
  );
  const stateDistrictData = stateDistrictsList.find((val: any) => val.regionId === stateUT.name_id);

  stateUT.loksabhaConstituenciesCount = stateLoksabhaConstituencies?.loksabhaConstituenciesCount;
  stateUT.districtsCount = stateDistrictData?.numberOfDistricts;

  const d = getDistrictsByURL(stateUT, state.data.data);
  const v = getVidhansabhaConstituenciesList(stateUT, state.data.data);
  const l = getLoksabhaConstituenciesByURL(stateUT, state.data.data);

  // console.log(d);
  // console.log(v);
  // console.log(l);

  // const districtsLastStep = await districtsPipeline(stateUT, Object.values(d));
  // const districtsKeyedByIdURL = districtsLastStep.transformedDistrictsSOIGeo.reduce((agg: any, val: any) => {
  //   val.id_url.forEach((v: any) => {
  //     agg[v] = val;
  //   });

  //   return agg;
  // }, {});
  // console.log(districtsKeyedByIdURL);

  // const loksabhaConstituenciesLastStep = await loksabhaConstituenciesPipeline(stateUT, Object.values(l));
  // const loksabhaConstituenciesKeyedByIdURL = loksabhaConstituenciesLastStep.savedToKnowledgeGraph.reduce(
  //   (agg: any, val: any) => {
  //     val.id_url.forEach((v: any) => {
  //       agg[v] = val;
  //     });

  //     return agg;
  //   },
  //   {}
  // );
  // console.log(loksabhaConstituenciesKeyedByIdURL);

  const vidhansabhaConstituenciesLastStep = await vidhansabhaConstituenciesPipeline(stateUT, v);
  const vidhansabhaConstituenciesKeyedByIdURL = vidhansabhaConstituenciesLastStep.savedToKnowledgeGraph.reduce(
    (agg: any, val: any) => {
      val.id_url.forEach((v: any) => {
        agg[v] = val;
      });

      return agg;
    },
    {}
  );
  // // console.log(vidhansabhaConstituenciesKeyedByIdURL);

  // // iterate over dvl list, introduce name_ids
  // const vcnameIds = dataVDL.map((val: any) => {
  //   return {
  //     vc_name_id: vidhansabhaConstituenciesKeyedByIdURL[val.name_2.href].name_id,
  //     vc_wiki: vidhansabhaConstituenciesKeyedByIdURL[val.name_2.href].wikipedia_page,
  //     d_name_id: val.districts.map((v: any) => {
  //       return districtsKeyedByIdURL[v.href].name_id;
  //     }),
  //     lc_name_id: loksabhaConstituenciesKeyedByIdURL[val.loksabhaConstituency.href].name_id,
  //   };
  // });

  // // console.log(vcnameIds);

  // const graphQLClient = await createGraphQLClient();

  // // for (let vcId of vcnameIds) {
  // //   const id = await updateNodeType("_Indian_Vidhansabha_Constituency_", graphQLClient, {
  // //     filter: { name_id: { eq: vcId.vc_name_id } },
  // //     set: {
  // //       districts: vcId.d_name_id.map((val: any) => {
  // //         return { name_id: val };
  // //       }),
  // //       loksabha_constituencies: [{ name_id: vcId.lc_name_id }],
  // //     },
  // //   });
  // //   console.log(id);
  // // }

  // const lcNameIds = groupBy(vcnameIds, "lc_name_id");

  // const lcNameIdsConnections = reduce(
  //   lcNameIds,
  //   (agg: any, val: any, key: any) => {
  //     const vcs: any = {};
  //     const ds: any = {};

  //     val.forEach((v: any) => {
  //       vcs[v.vc_name_id] = true;
  //       v.d_name_id.map((d: any) => {
  //         ds[d] = true;
  //       });
  //     });

  //     agg[key] = {
  //       self: key,
  //       vcs: Object.keys(vcs),
  //       ds: Object.keys(ds),
  //     };

  //     return agg;
  //   },
  //   {}
  // );

  // console.log(lcNameIdsConnections);

  // for (let lcId in lcNameIdsConnections) {
  //   const id = await updateNodeType("_Indian_Loksabha_Constituency_", graphQLClient, {
  //     filter: { name_id: { eq: lcNameIdsConnections[lcId].self } },
  //     set: {
  //       districts: lcNameIdsConnections[lcId].ds.map((val: any) => {
  //         return { name_id: val };
  //       }),
  //       vidhansabha_constituencies: lcNameIdsConnections[lcId].vcs.map((val: any) => {
  //         return { name_id: val };
  //       }),
  //     },
  //   });
  //   console.log(id);
  // }

  // update vcs, lcs with connections data

  return;
})();

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

import { stateDistrictsList } from "../../admin-regions/districts-old/state-wise-districts-count-list-urls";
import { stateLoksabhaConstituenciesCountList } from "../../admin-regions/loksabha/state-wise-loksabha-constituencies-count-list-urls";
import { createGraphQLClient } from "../../knowledge-graph/generic/generic.utils";
import { updateNodeType } from "../../knowledge-graph/generic/generic.create";
import { statesAndUnionTerritories } from "../../admin-regions/states-basic/update-states";
import {
  keyByURLDistrictsVidhansabhaLoksabha,
  prepareLoksabhaToDistrictsAndVidhansabha,
  prepareVidhansabhaToDistrictsAndLoksabha,
  saveConnectLoksabhaToDistrictsAndVidhansabhas,
  saveConnectVidhansabhaToDistrictsAndLoksabhas,
} from "../../pipeline/link-dvl-pipeline";
import { geoCompare } from "./dvl-geo";

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

async function loksabhaConstituenciesPipeline(
  stateUT: any,
  loksabhaConstituenciesList: any,
  saveToKG: boolean = false
) {
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

  if (saveToKG) {
    steps.push({
      name: "Save Loksabha_Constituency to KnowledgeGraph",
      function: addLoksabhaConstituencyDataToKnowledgeGraph,
      input: null,
      key: "SAVE_DISTRICT_DATA_TO_KNOWLEDGE_GRAPH",
    });
  }

  const loksabhaConstituenciesProgressDir = path.join(
    __dirname,
    stateUT.name_id.split("in-sut-")[1],
    "loksabha-constituency-pipeline-logs"
  );
  const progressStatusFile = path.join(loksabhaConstituenciesProgressDir, "progressStatus.json");

  try {
    const lastStepOutput = await runPipeline(steps, outputs, loksabhaConstituenciesProgressDir, progressStatusFile);

    if (saveToKG) return lastStepOutput.savedToKnowledgeGraph;
    return lastStepOutput.transformedLoksabhaConstituenciesECIGeo;
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

async function vidhansabhaConstituenciesPipeline(
  stateUT: any,
  vidhansabhaConstituenciesList: any,
  saveToKG: boolean = false
) {
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
    savedToKnowledgeGraph: [],
  };

  if (saveToKG) {
    steps.push({
      name: "Save Vidhansabha_Constituency to KnowledgeGraph",
      function: addVidhansabhaConstituencyDataToKnowledgeGraph,
      input: null,
      key: "SAVE_DISTRICT_DATA_TO_KNOWLEDGE_GRAPH",
    });
  }

  const vidhansabhaConstituenciesProgressDir = path.join(
    __dirname,
    stateUT.name_id.split("in-sut-")[1],
    "vidhansabha-constituency-pipeline-logs"
  );
  const progressStatusFile = path.join(vidhansabhaConstituenciesProgressDir, "progressStatus.json");

  try {
    const lastStepOutput = await runPipeline(steps, outputs, vidhansabhaConstituenciesProgressDir, progressStatusFile);

    if (saveToKG) return lastStepOutput.savedToKnowledgeGraph;
    return lastStepOutput.transformedVidhansabhaConstituenciesECIGeo;
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

async function districtsPipeline(stateUT: any, districtsList: any, saveToKG: boolean = false) {
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
    // SOI district boundaries are not always to the point as per present situation
    // {
    //   name: "Transform Districts with SOI Geo",
    //   function: transformDistrictsWithSOIGeo,
    //   input: null, // Will be set after the sixth and seventh steps
    //   key: "APPEND_SOI_DATA_TRANSFORM_STATE_DISTRICTS_DATA",
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

  if (saveToKG) {
    steps.push({
      name: "Save Districts to KnowledgeGraph",
      function: addDistrictDataToKnowledgeGraph,
      input: null,
      key: "SAVE_DISTRICT_DATA_TO_KNOWLEDGE_GRAPH",
    });
  }

  const districtsProgressDir = path.join(__dirname, stateUT.name_id.split("in-sut-")[1], "district-pipeline-logs");
  const progressStatusFile = path.join(districtsProgressDir, "progressStatus.json");

  try {
    const lastStepOutput = await runPipeline(steps, outputs, districtsProgressDir, progressStatusFile);

    if (saveToKG) return lastStepOutput.savedToKnowledgeGraph;
    return lastStepOutput.transformedDistrictsSOIGeo;
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

async function connectDVLPipeline(
  stateUT: any,
  districtsPreparedOrAndSavedToKG: any,
  loksabhaConstituenciesPreparedOrAndSavedToKG: any,
  vidhansabhaConstituenciesPreparedOrAndSavedToKG: any,
  stateVCsData: any,
  saveToKG: boolean = false
) {
  console.log("DISTRICTS PROCESSING INITIALIZED: ", stateUT.name);

  const steps: PipelineStep[] = [
    {
      name: "Key outputs by wikipedia page urls",
      function: keyByURLDistrictsVidhansabhaLoksabha,
      key: "KEY_OUTPUTS_BY_WIKIPEDIA_PAGE_URL",
      input: null,
    },
    {
      name: "Key outputs by wikipedia page urls",
      function: prepareVidhansabhaToDistrictsAndLoksabha,
      key: "PREPARE_VIDHANSABHA_CONNECTIONS",
      input: null,
    },
    {
      name: "Key outputs by wikipedia page urls",
      function: prepareLoksabhaToDistrictsAndVidhansabha,
      key: "PREPARE_LOKSABHA_CONNECTIONS",
      input: null,
    },
  ];

  let outputs: Record<string, any> = {
    districtsPreparedOrAndSavedToKG,
    loksabhaConstituenciesPreparedOrAndSavedToKG,
    vidhansabhaConstituenciesPreparedOrAndSavedToKG,
    stateVCsData,
  };

  if (saveToKG) {
    steps.push({
      name: "Key outputs by wikipedia page urls",
      function: saveConnectVidhansabhaToDistrictsAndLoksabhas,
      key: "SAVE_VIDHANSABHA_CONNECTIONS",
      input: null,
    });
    steps.push({
      name: "Key outputs by wikipedia page urls",
      function: saveConnectLoksabhaToDistrictsAndVidhansabhas,
      key: "SAVE_LOKSABHA_CONNECTIONS",
      input: null,
    });
  }

  const linkDVLProgressDir = path.join(__dirname, stateUT.name_id.split("in-sut-")[1], "link-dvl-pipeline-logs");
  const progressStatusFile = path.join(linkDVLProgressDir, "progressStatus.json");

  try {
    const lastStepOutput = await runPipeline(steps, outputs, linkDVLProgressDir, progressStatusFile);
    return lastStepOutput;
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

// connectDistricsVidhansabhaConstituencesLoksabhaConstituencies(
//    state.data.data,
//    districtsLastStep.savedToKnowledgeGraph,
//    loksabhaConstituenciesLastStep.savedToKnowledgeGraph,
//    vidhansabhaConstituenciesLastStep.savedToKnowledgeGraph
// );
// transformedDistrictsSOIGeo, transformedLoksabhaConstituenciesECIGeo, transformedVidhansabhaConstituenciesECIGeo
// async function connectDistricsVidhansabhaConstituencesLoksabhaConstituencies() {}

(async () => {
  const extraStateDetailsByNameId = keyBy(statesAndUnionTerritories, "name_id");
  let state: any = statesUTsVDL[1];

  let stateUT: any = {
    name: state.state_name,
    name_id: state.name_id,
    vehicle_code: extraStateDetailsByNameId[state.name_id].vehicle_code,
    vidhansabhaConstituenciesCount: state.count,
  };
  // let stateUT: any = {
  //   name: "andaman and nicobar islands",
  //   name_id: "in-sut-andaman-nicobar-islands",
  //   vehicle_code: "AN",
  //   // vidhansabhaConstituenciesCount: state.count,
  // };

  console.log("INNITATING PROCESSING OF STATE ", stateUT.name);

  // const stateLoksabhaConstituencies = stateLoksabhaConstituenciesCountList.find(
  //   (val: any) => val.stateNameId === stateUT.name_id
  // );
  const stateDistrictData = stateDistrictsList.find((val: any) => val.regionId === stateUT.name_id);

  // stateUT.loksabhaConstituenciesCount = stateLoksabhaConstituencies?.loksabhaConstituenciesCount;
  stateUT.districtsCount = stateDistrictData?.numberOfDistricts;

  const d = getDistrictsByURL(stateUT, state.data.data);
  // const l = getLoksabhaConstituenciesByURL(stateUT, state.data.data);
  // const v = getVidhansabhaConstituenciesList(stateUT, state.data.data);

  // const d = [
  //   {
  //     names: ["Nicobar"],
  //     wikipedia_page: "https://en.wikipedia.org/wiki/Nicobar_district",
  //   },
  //   {
  //     names: ["North and Middle Andaman"],
  //     wikipedia_page: "https://en.wikipedia.org/wiki/North_and_Middle_Andaman_district",
  //   },
  //   {
  //     names: ["South Andaman"],
  //     wikipedia_page: "https://en.wikipedia.org/wiki/South_Andaman_district",
  //   },
  // ];

  // console.log(d);
  // console.log(v);
  // console.log(l);

  const saveToKG = true;

  const districtsLastStep = await districtsPipeline(stateUT, Object.values(d), saveToKG);
  // const loksabhaConstituenciesLastStep = await loksabhaConstituenciesPipeline(stateUT, Object.values(l), saveToKG);
  // const vidhansabhaConstituenciesLastStep = await vidhansabhaConstituenciesPipeline(stateUT, v, saveToKG);

  // let districtsGeo = districtsLastStep.map((val: any) => {
  //   return {
  //     type: "Feature",
  //     geometry: val.geo?.geo_osm?.geo_osm?.source_data ? JSON.parse(val.geo.geo_osm.geo_osm.source_data)?.geometry : {},
  //     properties: {
  //       name_id: val.name_id,
  //       // wikipedia_page: val.district.toSaveDistrict.wikipedia_page,
  //       wikidata_qid: val.district.toSaveDistrict.wikidata_qid,
  //       osm_id: val.district.toSaveDistrict.osm_id,
  //       geo_osm_id: val.geo.geo_osm.geoOSMId,
  //     },
  //   };
  // });

  // districtsGeo = {
  //   type: "FeatureCollection",
  //   features: districtsGeo,
  // };

  // let loksabhaConstituenciesGeo = loksabhaConstituenciesLastStep.map((val: any) => {
  //   return {
  //     type: "Feature",
  //     properties: {
  //       name_id: val.name_id,
  //       // wikipedia_page: val.loksabhaConstituency.toSaveLoksabhaConstituency.wikipedia_page,
  //       wikidata_qid: val.loksabhaConstituency.toSaveLoksabhaConstituency.wikidata_qid,
  //       disestablished_on_string: val.loksabhaConstituency.toSaveLoksabhaConstituency.disestablished_on_string,
  //       osm_id: val.loksabhaConstituency.toSaveLoksabhaConstituency.osm_id,
  //       geo_eci_id: val.geo.geo_eci?.geoECIId,
  //     },
  //     geometry: val.geo?.geo_eci?.geo_eci ? JSON.parse(val.geo.geo_eci.geo_eci.source_data)?.geometry : null,
  //   };
  // });

  // loksabhaConstituenciesGeo = {
  //   type: "FeatureCollection",
  //   features: loksabhaConstituenciesGeo,
  // };

  // let vidhansabhaConstituenciesGeo = vidhansabhaConstituenciesLastStep.map((val: any) => {
  //   return {
  //     type: "Feature",
  //     properties: {
  //       name_id: val.name_id,
  //       // wikipedia_page: val.vidhansabhaConstituency.toSaveVidhansabhaConstituency.wikipedia_page,
  //       wikidata_qid: val.vidhansabhaConstituency.toSaveVidhansabhaConstituency.wikidata_qid,
  //       disestablished_on_string: val.vidhansabhaConstituency.toSaveVidhansabhaConstituency.disestablished_on_string,
  //       geo_eci_id: val.geo.geo_eci.geoECIId,
  //     },
  //     geometry: val.geo?.geo_eci?.geo_eci ? JSON.parse(val.geo.geo_eci.geo_eci.source_data)?.geometry : null,
  //   };
  // });

  // vidhansabhaConstituenciesGeo = {
  //   type: "FeatureCollection",
  //   features: vidhansabhaConstituenciesGeo,
  // };

  // // await geoCompare(districtsGeo, vidhansabhaConstituenciesGeo);
  // await geoCompare(loksabhaConstituenciesGeo, vidhansabhaConstituenciesGeo);

  // await connectDVLPipeline(
  //   stateUT,
  //   districtsLastStep,
  //   loksabhaConstituenciesLastStep,
  //   vidhansabhaConstituenciesLastStep,
  //   state.data.data,
  //   saveToKG
  // );

  // update vcs, lcs with connections data

  return;
})();

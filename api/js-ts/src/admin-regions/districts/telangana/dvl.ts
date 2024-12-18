import path from "path";

import {
  fetchLoksabhaConstituenciesWikiDetails,
  fetchLoksabhaConstituencyECIGeoFeatures,
  fetchStateLoksabhaConstituencies,
  transformLoksabhaConstituenciesWikipediaData,
  transformLoksabhaConstituenciesWithECIGeo,
} from "../../../pipeline/loksabha-pipeline";
import { PipelineStep, runPipeline } from "../../../pipeline/pipeline";
import dataVDL from "./tl.d-vc.json";
import { groupBy, map, uniqWith, isEqual, reduce } from "lodash";
import {
  fetchStateVidhansabhaConstituencies,
  fetchVidhansabhaConstituenciesWikiDetails,
  fetchVidhansabhaConstituencyECIGeoFeatures,
  transformVidhansabhaConstituenciesWikipediaData,
  transformVidhansabhaConstituenciesWithECIGeo,
} from "../../../pipeline/vidhansabha-pipeline";
import {
  fetchDistrictSOIGeoFeatures,
  fetchDistrictsOSMDetails,
  fetchDistrictsOSMRelationIds,
  fetchDistrictsWikiDetails,
  fetchStateDistricts,
  fetchStateOSMData,
  transformDistrictsWikipediaData,
  transformDistrictsWithOSM,
  transformDistrictsWithSOIGeo,
} from "../../../pipeline/districts-pipeline";

function getDistrictsByURL() {
  // get all districts, can be repeated
  let d: any = [];
  dataVDL.forEach((val: any) => {
    d = d.concat(val.districts);
  });

  let dGroupedByURL = groupBy(d, "href");

  // remove duplicate values
  dGroupedByURL = reduce(
    dGroupedByURL,
    (agg: any, val: any, idx: any) => {
      agg[idx] = uniqWith(val, isEqual);
      return agg;
    },
    {}
  );

  // merge values with same url but different names
  dGroupedByURL = reduce(
    dGroupedByURL,
    (agg: any, val: any, idx: any) => {
      agg[idx] = val.reduce((agg1: any, val1: any) => {
        agg1.text = agg1.text || [];
        agg1.text.push(val1.text);
        agg1.href = val1.href;

        return agg1;
      }, {});
      return agg;
    },
    {}
  );

  return dGroupedByURL;
}

function getVidhansabhaConstituenciesList() {
  let v = dataVDL.map((val: any) => {
    return {
      vidhansabha_constituency_number: val.ac_no,
      vidhansabha_constituency_name: val.name_2.text,
      vidhansabha_constituency_wikipedia_page: val.name_2.href,
      reservation: val.reservation,
    };
  });

  return v;
}

function getLoksabhaConstituenciesByURL() {
  let l: any = [];
  dataVDL.forEach((val: any) => {
    l.push(val.loksabhaConstituency);
  });

  let lGroupedByURL = groupBy(l, "href");

  // remove duplicate values
  lGroupedByURL = reduce(
    lGroupedByURL,
    (agg: any, val: any, idx: any) => {
      agg[idx] = uniqWith(val, isEqual);
      return agg;
    },
    {}
  );

  // merge values with same url but different names
  lGroupedByURL = reduce(
    lGroupedByURL,
    (agg: any, val: any, idx: any) => {
      agg[idx] = val.reduce((agg1: any, val1: any) => {
        agg1.text = agg1.text || [];
        agg1.text.push(val1.text);
        agg1.href = val1.href;

        return agg1;
      }, {});
      return agg;
    },
    {}
  );

  return lGroupedByURL;
}

async function loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList) {
  console.log("LOKSABHA PROCESSING INITIALIZED: ", stateUT.name);

  const steps: PipelineStep[] = [
    {
      name: "Fetch State Loksabha_Constituency",
      function: fetchStateLoksabhaConstituencies,
      key: "STATE_LOKSABHA_LIST",
      input: stateUT,
    },
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
    loksabhaConstituenciesList,
    stateLoksabhaConstituencies: [],
    loksabhaConstituenciesCount: 0,
    loksabhaConstituenciesWikiDetails: [],
    loksabhaConstituenciesWikiDetailsFailed: [],
    loksabhaConstituencyFeaturesECI: [],
    transformedLoksabhaConstituenciesWikipedia: [],
    loksabhaConstituenciesNotTransformedWikipedia: [],
    transformedLoksabhaConstituenciesECIGeo: [],
    unmatchedLoksabhaConstituenciesECIGeo: [],
  };

  const loksabhaConstituenciesProgressDir = path.join(__dirname, "loksabha-constituency-pipeline-logs");
  const progressStatusFile = path.join(loksabhaConstituenciesProgressDir, "progressStatus.json");

  try {
    await runPipeline(steps, outputs, loksabhaConstituenciesProgressDir, progressStatusFile);
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

async function vidhansabhaConstituenciesPipeline(stateUT, vidhansabhaConstituenciesList) {
  console.log("VIDHANSABHA PROCESSING INITIALIZED: ", stateUT.name);

  const steps: PipelineStep[] = [
    {
      name: "Fetch State Vidhansabha_Constituency",
      function: fetchStateVidhansabhaConstituencies,
      key: "STATE_VIDHANSABHA_LIST",
      input: stateUT,
    },
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
    stateVidhansabhaConstituencies: [],
    vidhansabhaConstituenciesCount: 0,
    vidhansabhaConstituenciesWikiDetails: [],
    vidhansabhaConstituenciesWikiDetailsFailed: [],
    vidhansabhaConstituencyFeaturesECI: [],
    transformedVidhansabhaConstituenciesWikipedia: [],
    vidhansabhaConstituenciesNotTransformedWikipedia: [],
    transformedVidhansabhaConstituenciesECIGeo: [],
    unmatchedVidhansabhaConstituenciesECIGeo: [],
  };

  const vidhansabhaConstituenciesProgressDir = path.join(__dirname, "vidhansabha-constituency-pipeline-logs");
  const progressStatusFile = path.join(vidhansabhaConstituenciesProgressDir, "progressStatus.json");

  try {
    await runPipeline(steps, outputs, vidhansabhaConstituenciesProgressDir, progressStatusFile);
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

async function districtsPipeline(stateUT, districtsList) {
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
    stateUT: {},
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
    unmatchedDistrictsOSMWiki: [],
    transformedDistrictsSOIGeo: [],
    unmatchedDistrictsSOIGeo: [],
  };

  const districtsProgressDir = path.join(__dirname, "district-pipeline-logs");
  const progressStatusFile = path.join(districtsProgressDir, "progressStatus.json");

  try {
    await runPipeline(steps, outputs, districtsProgressDir, progressStatusFile);
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

(async () => {
  const stateUT = {
    state_name: "Telangana",
    name_id: "in-sut-telangana",
    vehicle_code: "TG",
  };

  const d = getDistrictsByURL();
  const v = getVidhansabhaConstituenciesList();
  const l = getLoksabhaConstituenciesByURL();

  await districtsPipeline(stateUT, Object.values(d));
  await loksabhaConstituenciesPipeline(stateUT, Object.values(l));
  await vidhansabhaConstituenciesPipeline(stateUT, v);
})();

// keyedLoksabhaConstituencies = reduce(
//   keyedLoksabhaConstituencies,
//   (agg: any, val: any, idx: any) => {
//     agg[idx] = uniqWith(val, isEqual);
//     return agg;
//   },
//   {}
// );

// // merge names
// keyedLoksabhaConstituencies = reduce(
//   keyedLoksabhaConstituencies,
//   (agg: any, val: any, idx: any) => {
//     agg[idx] = val.reduce((agg1: any, val1: any) => {
//       agg1.names = agg1.names || [];
//       agg1.names = agg1.names.concat(val1.names);

//       agg1.wikipedia_page = val1.wikipedia_page;
//       agg1.states_union_territories = val1.states_union_territories;

//       return agg1;
//     }, {});
//     return agg;
//   },
//   {}
// );

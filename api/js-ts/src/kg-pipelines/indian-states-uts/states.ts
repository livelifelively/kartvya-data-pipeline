import path from "path";

import { PipelineStep, runPipeline } from "../../pipeline/pipeline";
import { statesUTsVDL } from "../../source-wikipedia/d-vc-lc.v3";
import { groupBy, map, uniqWith, isEqual, reduce, forEach, keyBy } from "lodash";
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
import { statesAndUnionTerritories } from "../../admin-regions/states-basic/update-states";

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

(async () => {
  const extraStateDetailsByNameId = keyBy(statesAndUnionTerritories, "name_id");
  let state: any = statesUTsVDL[1];

  let stateUT: any = {
    name: state.state_name,
    name_id: state.name_id,
    vehicle_code: extraStateDetailsByNameId[state.name_id].vehicle_code,
    vidhansabhaConstituenciesCount: state.count,
  };

  console.log("INNITATING PROCESSING OF STATE ", stateUT.name);

  const stateDistrictData = stateDistrictsList.find((val: any) => val.regionId === stateUT.name_id);

  stateUT.districtsCount = stateDistrictData?.numberOfDistricts;

  const d = getDistrictsByURL(stateUT, state.data.data);

  const saveToKG = true;

  const districtsLastStep = await districtsPipeline(stateUT, Object.values(d), saveToKG);

  return;
})();

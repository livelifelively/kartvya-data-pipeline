import path from "path";
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
} from "../../../../pipeline/districts-pipeline";
import { PipelineStep, runPipeline } from "../../../../pipeline/pipeline";

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
    // {
    //   name: "Fetch District SOI Geo Features",
    //   function: fetchDistrictSOIGeoFeatures,
    //   key: "STATE_DISTRICTS_SOI_GEO_DATA",
    //   input: null,
    // },
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

  const districtsProgressDir = path.join(__dirname, "../", "district-pipeline-logs");
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
  const stateUT = {
    state: "meghalaya",
    name_id: "in-sut-meghalaya",
    vehicle_code: "ML",
  };

  const districtsList = [
    {
      names: ["East Garo Hills"],
      wikipedia_page: "https://en.wikipedia.org/wiki/East_Garo_Hills",
    },
    {
      names: ["East Khasi Hills"],
      wikipedia_page: "https://en.wikipedia.org/wiki/East_Khasi_Hills",
    },
    {
      names: ["East Jaintia Hills"],
      wikipedia_page: "https://en.wikipedia.org/wiki/East_Jaintia_Hills",
    },
    {
      names: ["Eastern West Khasi Hills"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Eastern_West_Khasi_Hills_district",
    },
    {
      names: ["North Garo Hills"],
      wikipedia_page: "https://en.wikipedia.org/wiki/North_Garo_Hills",
    },
    {
      names: ["Ri Bhoi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ri-Bhoi",
    },
    {
      names: ["South Garo Hills"],
      wikipedia_page: "https://en.wikipedia.org/wiki/South_Garo_Hills",
    },
    {
      names: ["South West Garo Hills"],
      wikipedia_page: "https://en.wikipedia.org/wiki/South_West_Garo_Hills",
    },
    {
      names: ["South West Khasi Hills"],
      wikipedia_page: "https://en.wikipedia.org/wiki/South_West_Khasi_Hills",
    },
    {
      names: ["West Garo Hills"],
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Garo_Hills",
    },
    {
      names: ["West Jaintia Hills"],
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Jaintia_Hills",
    },
    {
      names: ["West Khasi Hills"],
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Khasi_Hills",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

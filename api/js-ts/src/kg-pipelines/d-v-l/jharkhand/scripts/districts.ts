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
    state_name: "jharkhand",
    name_id: "in-sut-jharkhand",
    vehicle_code: "JH",
  };

  const districtsList = [
    {
      names: ["Bokaro"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bokaro_district",
    },
    {
      names: ["Chatra"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chatra_district",
    },
    {
      names: ["Deoghar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Deoghar_district",
    },
    {
      names: ["Dhanbad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dhanbad_district",
    },
    {
      names: ["Dumka"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dumka_district",
    },
    {
      names: ["East Singhbhum"],
      wikipedia_page: "https://en.wikipedia.org/wiki/East_Singhbhum_district",
    },
    {
      names: ["Garhwa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Garhwa_district",
    },
    {
      names: ["Giridih"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Giridih_district",
    },
    {
      names: ["Godda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Godda_district",
    },
    {
      names: ["Gumla"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gumla_district",
    },
    {
      names: ["Hazaribag"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hazaribagh_district",
    },
    {
      names: ["Jamtara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jamtara_district",
    },
    {
      names: ["Khunti"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khunti_district",
    },
    {
      names: ["Koderma"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Koderma_district",
    },
    {
      names: ["Latehar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Latehar_district",
    },
    {
      names: ["Lohardaga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Lohardaga_district",
    },
    {
      names: ["Pakur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pakur_district",
    },
    {
      names: ["Palamu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Palamu_district",
    },
    {
      names: ["Ramgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ramgarh_district",
    },
    {
      names: ["Ranchi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ranchi_district",
    },
    {
      names: ["Sahibganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sahebganj_district",
    },
    {
      names: ["Seraikela-Kharsawan"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Seraikela_Kharsawan_district",
    },
    {
      names: ["Simdega"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Simdega_district",
    },
    {
      names: ["West Singhbhum"],
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Singhbhum_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

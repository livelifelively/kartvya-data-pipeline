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
    name: "maharashtra",
    name_id: "in-sut-maharashtra",
    vehicle_code: "MH",
  };

  const districtsList = [
    {
      names: ["Ahmednagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ahmednagar_district",
    },
    {
      names: ["Akola"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Akola_district",
    },
    {
      names: ["Amravati"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Amravati_district",
    },
    {
      names: ["Aurangabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Aurangabad_district,_Maharashtra",
    },
    {
      names: ["Beed"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Beed_district",
    },
    {
      names: ["Bhandara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhandara_district",
    },
    {
      names: ["Buldhana"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Buldhana_district",
    },
    {
      names: ["Chandrapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chandrapur_district",
    },
    {
      names: ["Osmanabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Osmanabad_district",
    },
    {
      names: ["Dhule"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dhule_district",
    },
    {
      names: ["Gadchiroli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gadchiroli_district",
    },
    {
      names: ["Gondia"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gondia_district",
    },
    {
      names: ["Hingoli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hingoli_district",
    },
    {
      names: ["Jalgaon"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jalgaon_district",
    },
    {
      names: ["Jalna"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jalna_district",
    },
    {
      names: ["Kolhapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kolhapur_district",
    },
    {
      names: ["Latur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Latur_district",
    },
    {
      names: ["Mumbai City"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mumbai_City_district",
    },
    {
      names: ["Mumbai Suburban"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mumbai_Suburban_district",
    },
    {
      names: ["Nanded"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nanded_district",
    },
    {
      names: ["Nandurbar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nandurbar_district",
    },
    {
      names: ["Nagpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nagpur_district",
    },
    {
      names: ["Nashik"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nashik_district",
    },
    {
      names: ["Palghar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Palghar_district",
    },
    {
      names: ["Parbhani"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Parbhani_district",
    },
    {
      names: ["Pune"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pune_district",
    },
    {
      names: ["Raigad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Raigad_district",
    },
    {
      names: ["Ratnagiri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ratnagiri_district",
    },
    {
      names: ["Sangli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sangli_district",
    },
    {
      names: ["Satara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Satara_district",
    },
    {
      names: ["Sindhudurg"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sindhudurg_district",
    },
    {
      names: ["Solapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Solapur_district",
    },
    {
      names: ["Thane"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Thane_district",
    },
    {
      names: ["Wardha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Wardha_district",
    },
    {
      names: ["Washim"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Washim_district",
    },
    {
      names: ["Yavatmal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Yavatmal_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

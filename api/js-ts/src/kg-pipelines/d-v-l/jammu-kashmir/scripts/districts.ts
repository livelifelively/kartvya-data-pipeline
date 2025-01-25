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
    name: "jammu and kashmir",
    name_id: "in-sut-jammu-kashmir",
    vehicle_code: "JK",
  };

  const districtsList = [
    {
      names: ["Anantnag"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Anantnag_district",
    },
    {
      names: ["Budgam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Budgam_district",
    },
    {
      names: ["Bandipore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bandipora_district",
    },
    {
      names: ["Baramulla"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Baramulla_district",
    },
    {
      names: ["Doda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Doda_district",
    },
    {
      names: ["Ganderbal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ganderbal_district",
    },
    {
      names: ["Jammu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jammu_district",
    },
    {
      names: ["Kathua"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kathua_district",
    },
    {
      names: ["Kishtwar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kishtwar_district",
    },
    {
      names: ["Kulgam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kulgam_district",
    },
    {
      names: ["Kupwara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kupwara_district",
    },
    {
      names: ["Poonch"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Poonch_district,_India",
    },
    {
      names: ["Pulwama"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pulwama_district",
    },
    {
      names: ["Rajouri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajauri_district",
    },
    {
      names: ["Ramban"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ramban_district",
    },
    {
      names: ["Reasi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Reasi_district",
    },
    {
      names: ["Samba"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Samba_district",
    },
    {
      names: ["Shopian"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shopian_district",
    },
    {
      names: ["Srinagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Srinagar_district",
    },
    {
      names: ["Udhampur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Udhampur_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

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
    name: "haryana",
    name_id: "in-sut-haryana",
    vehicle_code: "HR",
  };

  const districtsList = [
    {
      names: ["Ambala"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ambala_district",
    },
    {
      names: ["Bhiwani"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhiwani_district",
    },
    {
      names: ["Charkhi Dadri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Charkhi_Dadri_district",
    },
    {
      names: ["Faridabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Faridabad_district",
    },
    {
      names: ["Fatehabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Fatehabad_district",
    },
    {
      names: ["Gurugram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gurgaon_district",
    },
    {
      names: ["Hisar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hisar_(district)",
    },
    {
      names: ["Jhajjar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jhajjar_district",
    },
    {
      names: ["Jind"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jind_district",
    },
    {
      names: ["Kaithal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kaithal_district",
    },
    {
      names: ["Karnal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Karnal_district",
    },
    {
      names: ["Kurukshetra"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kurukshetra_district",
    },
    {
      names: ["Mahendragarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mahendragarh_district",
    },
    {
      names: ["Nuh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nuh_district",
    },
    {
      names: ["Palwal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Palwal_district",
    },
    {
      names: ["Panchkula"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Panchkula_district",
    },
    {
      names: ["Panipat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Panipat_district",
    },
    {
      names: ["Rewari"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rewari_district",
    },
    {
      names: ["Rohtak"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rohtak_district",
    },
    {
      names: ["Sirsa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sirsa_district",
    },
    {
      names: ["Sonipat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sonipat_district",
    },
    {
      names: ["Yamunanagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Yamuna_Nagar_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

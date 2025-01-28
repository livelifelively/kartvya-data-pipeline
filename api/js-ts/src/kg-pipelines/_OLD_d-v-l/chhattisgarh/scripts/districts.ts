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
    state_name: "chhattisgarh",
    name_id: "in-sut-chhattisgarh",
    vehicle_code: "CG",
  };

  const districtsList = [
    {
      names: ["Balod"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Balod_district",
    },
    {
      names: ["Baloda Bazar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Baloda_Bazar_district",
    },
    {
      names: ["Balrampur-Ramanujganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Balrampur_district,_Chhattisgarh",
    },
    {
      names: ["Bastar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bastar_district",
    },
    {
      names: ["Bemetara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bemetara_district",
    },
    {
      names: ["Bijapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bijapur_district,_Chhattisgarh",
    },
    {
      names: ["Bilaspur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bilaspur_district,_Chhattisgarh",
    },
    {
      names: ["Dantewada"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dantewada_district",
    },
    {
      names: ["Dhamtari"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dhamtari_district",
    },
    {
      names: ["Durg"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Durg_district",
    },
    {
      names: ["Gariaband"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gariaband_district",
    },
    {
      names: ["Gaurela-Pendra-Marwahi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gaurella-Pendra-Marwahi_district",
    },
    {
      names: ["Janjgir-Champa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Janjgir%E2%80%93Champa_district",
    },
    {
      names: ["Jashpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jashpur_district",
    },
    {
      names: ["Kabirdham"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kabirdham_district",
    },
    {
      names: ["Kanker"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kanker_district",
    },
    {
      names: ["Khairagarh-Chhuikhadan-Gandai"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khairagarh-Chhuikhadan-Gandai_district",
    },
    {
      names: ["Kondagaon"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kondagaon_district",
    },
    {
      names: ["Korba"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Korba_district",
    },
    {
      names: ["Korea"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Koriya_district",
    },
    {
      names: ["Mahasamund"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mahasamund_district",
    },
    {
      names: ["Manendragarh-Chirmiri-Bharatpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Manendragarh-Chirmiri-Bharatpur_district",
    },
    {
      names: ["Mohla-Manpur-Ambagarh Chowki"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mohla-Manpur-Ambagarh_Chowki_district",
    },
    {
      names: ["Mungeli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mungeli_district",
    },
    {
      names: ["Narayanpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Narayanpur_district",
    },
    {
      names: ["Raigarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Raigarh_district",
    },
    {
      names: ["Raipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Raipur_district",
    },
    {
      names: ["Rajnandgaon"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajnandgaon_district",
    },
    {
      names: ["Sarangarh-Bilaigarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sarangarh-Bilaigarh_district",
    },
    {
      names: ["Sakti"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sakti_district",
    },
    {
      names: ["Sukma"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sukma_district",
    },
    {
      names: ["Surajpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Surajpur_district",
    },
    {
      names: ["Surguja"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Surguja_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

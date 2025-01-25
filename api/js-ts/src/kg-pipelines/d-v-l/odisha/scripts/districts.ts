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
    name: "odisha",
    name_id: "in-sut-odisha",
    vehicle_code: "OD",
  };

  const districtsList = [
    {
      names: ["Angul"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Angul_district",
    },
    {
      names: ["Boudh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Boudh_district",
    },
    {
      names: ["Bhadrak"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhadrak_district",
    },
    {
      names: ["Balangir"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Balangir_district",
    },
    {
      names: ["Bargarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bargarh_district",
    },
    {
      names: ["Balasore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Balasore_district",
    },
    {
      names: ["Cuttack"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Cuttack_district",
    },
    {
      names: ["Debagarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Debagarh_district",
    },
    {
      names: ["Dhenkanal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dhenkanal_district",
    },
    {
      names: ["Ganjam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ganjam_district",
    },
    {
      names: ["Gajapati"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gajapati_district",
    },
    {
      names: ["Jharsuguda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jharsuguda_district",
    },
    {
      names: ["Jajpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jajpur_district",
    },
    {
      names: ["Jagatsinghpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jagatsinghpur_district",
    },
    {
      names: ["Khordha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khordha_district",
    },
    {
      names: ["Kendujhar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kendujhar_district",
    },
    {
      names: ["Kalahandi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kalahandi_district",
    },
    {
      names: ["Kandhamal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kandhamal_district",
    },
    {
      names: ["Koraput"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Koraput_district",
    },
    {
      names: ["Kendrapara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kendrapara_district",
    },
    {
      names: ["Malkangiri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Malkangiri_district",
    },
    {
      names: ["Mayurbhanj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mayurbhanj_district",
    },
    {
      names: ["Nabarangpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nabarangpur_district",
    },
    {
      names: ["Nuapada"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nuapada_district",
    },
    {
      names: ["Nayagarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nayagarh_district",
    },
    {
      names: ["Puri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Puri_district",
    },
    {
      names: ["Rayagada"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rayagada_district",
    },
    {
      names: ["Sambalpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sambalpur_district",
    },
    {
      names: ["Subarnapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Subarnapur_district",
    },
    {
      names: ["Sundargarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sundergarh_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

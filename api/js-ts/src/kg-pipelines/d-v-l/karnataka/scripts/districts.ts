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
    state: "karnataka",
    name_id: "in-sut-karnataka",
    vehicle_code: "KA",
  };

  const districtsList = [
    {
      names: ["Bagalkot"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bagalkot_district",
    },
    {
      names: ["Ballari"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bellary_district",
    },
    {
      names: ["Belagavi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Belgaum_district",
    },
    {
      names: ["Bangalore Rural"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bangalore_Rural_district",
    },
    {
      names: ["Bangalore Urban"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bangalore_Urban_district",
    },
    {
      names: ["Bidar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bidar_district",
    },
    {
      names: ["Chamarajanagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chamarajanagar_district",
    },
    {
      names: ["Chikkaballapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chikkaballapur_district",
    },
    {
      names: ["Chikmagalur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chikmagalur_district",
    },
    {
      names: ["Chitradurga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chitradurga_district",
    },
    {
      names: ["Dakshina Kannada"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dakshina_Kannada",
    },
    {
      names: ["Davanagere"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Davanagere_district",
    },
    {
      names: ["Dharwad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dharwad_district",
    },
    {
      names: ["Gadaga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gadag_district",
    },
    {
      names: ["Kalaburagi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kalaburagi_district",
    },
    {
      names: ["Hassan"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hassan_district",
    },
    {
      names: ["Haveri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Haveri_district",
    },
    {
      names: ["Kodagu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kodagu_district",
    },
    {
      names: ["Kolar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kolar_district",
    },
    {
      names: ["Koppal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Koppal_district",
    },
    {
      names: ["Mandya"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mandya_district",
    },
    {
      names: ["Mysore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mysore_district",
    },
    {
      names: ["Raichur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Raichur_district",
    },
    {
      names: ["Ramanagara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ramanagara_district",
    },
    {
      names: ["Shimoga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shimoga_district",
    },
    {
      names: ["Tumakuru"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tumakuru_district",
    },
    {
      names: ["Udupi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Udupi_district",
    },
    {
      names: ["Uttara Kannada"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Uttara_Kannada",
    },
    {
      names: ["Vijayanagara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vijayanagara_district",
    },
    {
      names: ["Bijapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bijapur_district,_Karnataka",
    },
    {
      names: ["Yadgir"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Yadgir_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

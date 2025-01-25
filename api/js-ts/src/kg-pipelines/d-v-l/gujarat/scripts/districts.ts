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
    name: "gujarat",
    name_id: "in-sut-gujarat",
    vehicle_code: "GJ",
  };

  const districtsList = [
    {
      names: ["Ahmedabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ahmedabad_district",
    },
    {
      names: ["Amreli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Amreli_district",
    },
    {
      names: ["Anand"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Anand_district",
    },
    {
      names: ["Aravalli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Aravalli_district",
    },
    {
      names: ["Banaskantha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Banaskantha_district",
    },
    {
      names: ["Bharuch"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bharuch_district",
    },
    {
      names: ["Bhavnagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhavnagar_district",
    },
    {
      names: ["Botad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Botad_District",
    },
    {
      names: ["Chhota Udaipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chhota_Udaipur_district",
    },
    {
      names: ["Dahod"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dahod_district",
    },
    {
      names: ["Dang"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dang_District,_India",
    },
    {
      names: ["Devbhumi Dwarka"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Devbhoomi_Dwarka_district",
    },
    {
      names: ["Gandhinagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gandhinagar_district",
    },
    {
      names: ["Gir Somnath"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gir_Somnath_district",
    },
    {
      names: ["Jamnagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jamnagar_district",
    },
    {
      names: ["Junagadh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Junagadh_district",
    },
    {
      names: ["Kheda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kheda_district",
    },
    {
      names: ["Kutch"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kutch_district",
    },
    {
      names: ["Mahisagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mahisagar_district",
    },
    {
      names: ["Mehsana"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mehsana_district",
    },
    {
      names: ["Morbi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Morbi_district",
    },
    {
      names: ["Narmada"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Narmada_district",
    },
    {
      names: ["Navsari"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Navsari_district",
    },
    {
      names: ["Panchmahal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Panchmahal_district",
    },
    {
      names: ["Patan"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Patan_district",
    },
    {
      names: ["Porbandar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Porbandar_district",
    },
    {
      names: ["Rajkot"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajkot_district",
    },
    {
      names: ["Sabarkantha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sabarkantha_district",
    },
    {
      names: ["Surat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Surat_district",
    },
    {
      names: ["Surendranagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Surendranagar_district",
    },
    {
      names: ["Tapi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tapi_district",
    },
    {
      names: ["Vadodara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vadodara_district",
    },
    {
      names: ["Valsad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Valsad_district",
    },
    {
      names: ["Vav-Tharad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vav-Tharad_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

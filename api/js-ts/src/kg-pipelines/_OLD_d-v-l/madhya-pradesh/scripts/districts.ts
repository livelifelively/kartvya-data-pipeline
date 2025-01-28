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
    name: "madhya pradesh",
    name_id: "in-sut-madhya-pradesh",
    vehicle_code: "MP",
  };

  const districtsList = [
    {
      names: ["Agar Malwa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Agar_Malwa_district",
    },
    {
      names: ["Alirajpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Alirajpur_district",
    },
    {
      names: ["Anuppur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Anuppur_district",
    },
    {
      names: ["Ashoknagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ashok_Nagar_district",
    },
    {
      names: ["Balaghat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Balaghat_district",
    },
    {
      names: ["Barwani"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Barwani_district",
    },
    {
      names: ["Betul"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Betul_district",
    },
    {
      names: ["Bhind"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhind_district",
    },
    {
      names: ["Bhopal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhopal_district",
    },
    {
      names: ["Burhanpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Burhanpur_district",
    },
    {
      names: ["Chhatarpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chhatarpur_district",
    },
    {
      names: ["Chhindwara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chhindwara_district",
    },
    {
      names: ["Damoh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Damoh_district",
    },
    {
      names: ["Datia"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Datia_district",
    },
    {
      names: ["Dewas"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dewas_district",
    },
    {
      names: ["Dhar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dhar_district",
    },
    {
      names: ["Dindori"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dindori_district",
    },
    {
      names: ["Guna"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Guna_district",
    },
    {
      names: ["Gwalior"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gwalior_district",
    },
    {
      names: ["Harda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Harda_district",
    },
    {
      names: ["Hoshangabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hoshangabad_district",
    },
    {
      names: ["Indore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Indore_district",
    },
    {
      names: ["Jabalpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jabalpur_district",
    },
    {
      names: ["Jhabua"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jhabua_district",
    },
    {
      names: ["Katni"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Katni_district",
    },
    {
      names: ["Khandwa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khandwa_district",
    },
    {
      names: ["Khargone"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khargone_district",
    },
    {
      names: ["Maihar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Maihar_district",
    },
    {
      names: ["Mandla"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mandla_district",
    },
    {
      names: ["Mandsaur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mandsaur_district",
    },
    {
      names: ["Mauganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mauganj_district",
    },
    {
      names: ["Morena"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Morena_district",
    },
    {
      names: ["Narsinghpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Narsinghpur_district",
    },
    {
      names: ["Neemuch"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Neemuch_district",
    },
    {
      names: ["Niwari"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Niwari_district",
    },
    {
      names: ["Panna"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Panna_district",
    },
    {
      names: ["Pandhurna"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pandhurna_district",
    },
    {
      names: ["Raisen"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Raisen_district",
    },
    {
      names: ["Rajgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajgarh_district",
    },
    {
      names: ["Ratlam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ratlam_district",
    },
    {
      names: ["Rewa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rewa_district",
    },
    {
      names: ["Sagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sagar_district",
    },
    {
      names: ["Satna"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Satna_district",
    },
    {
      names: ["Sehore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sehore_district",
    },
    {
      names: ["Seoni"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Seoni_district",
    },
    {
      names: ["Shahdol"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shahdol_district",
    },
    {
      names: ["Shajapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shajapur_district",
    },
    {
      names: ["Sheopur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sheopur_district",
    },
    {
      names: ["Shivpuri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shivpuri_district",
    },
    {
      names: ["Sidhi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sidhi_district",
    },
    {
      names: ["Singrauli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Singrauli_district",
    },
    {
      names: ["Tikamgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tikamgarh_district",
    },
    {
      names: ["Ujjain"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ujjain_district",
    },
    {
      names: ["Umaria"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Umaria_district",
    },
    {
      names: ["Vidisha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vidisha_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

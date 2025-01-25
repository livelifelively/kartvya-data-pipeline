// TODO FIXME
/**
 * Administratively Puducherry only has 2 districts, Puducherry and Karaikal.
 * The districts of Yanam and Mahé are census districts and not administrative districts.
 * The sub-taluks covered by these 2 census districts are administratively under the Puducherry district.[1][2]
 */

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
    name: "tamil nadu",
    name_id: "in-sut-tamil-nadu",
    vehicle_code: "TN",
  };

  const districtsList = [
    {
      names: ["Ariyalur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ariyalur_district",
    },
    {
      names: ["Chengalpattu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chengalpattu_district",
    },
    {
      names: ["Chennai"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chennai_district",
    },
    {
      names: ["Coimbatore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Coimbatore_district",
    },
    {
      names: ["Cuddalore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Cuddalore_district",
    },
    {
      names: ["Dharmapuri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dharmapuri_district",
    },
    {
      names: ["Dindigul"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dindigul_district",
    },
    {
      names: ["Erode"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Erode_district",
    },
    {
      names: ["Kallakurichi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kallakurichi_district",
    },
    {
      names: ["Kanchipuram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kanchipuram_district",
    },
    {
      names: ["Kanyakumari"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kanyakumari_district",
    },
    {
      names: ["Karur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Karur_district",
    },
    {
      names: ["Krishnagiri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Krishnagiri_district",
    },
    {
      names: ["Madurai"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Madurai_district",
    },
    {
      names: ["Mayiladuthurai"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mayiladuthurai_district",
    },
    {
      names: ["Nagapattinam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nagapattinam_district",
    },
    {
      names: ["Nilgiris"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nilgiris_district",
    },
    {
      names: ["Namakkal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Namakkal_district",
    },
    {
      names: ["Perambalur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Perambalur_district",
    },
    {
      names: ["Pudukkottai"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pudukkottai_district",
    },
    {
      names: ["Ramanathapuram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ramanathapuram_district",
    },
    {
      names: ["Ranipet"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ranipet_district",
    },
    {
      names: ["Salem"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Salem_district",
    },
    {
      names: ["Sivaganga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sivaganga_district",
    },
    {
      names: ["Tenkasi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tenkasi_district",
    },
    {
      names: ["Tiruppur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tiruppur_district",
    },
    {
      names: ["Tiruchirappalli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tiruchirappalli_district",
    },
    {
      names: ["Theni"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Theni_district",
    },
    {
      names: ["Tirunelveli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tirunelveli_district",
    },
    {
      names: ["Thanjavur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Thanjavur_district",
    },
    {
      names: ["Thoothukudi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Thoothukudi_district",
    },
    {
      names: ["Tirupattur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tirupattur_district",
    },
    {
      names: ["Tiruvallur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tiruvallur_district",
    },
    {
      names: ["Tiruvarur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tiruvarur_district",
    },
    {
      names: ["Tiruvannamalai"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tiruvannamalai_district",
    },
    {
      names: ["Vellore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vellore_district",
    },
    {
      names: ["Viluppuram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Viluppuram_district",
    },
    {
      names: ["Virudhunagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Virudhunagar_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

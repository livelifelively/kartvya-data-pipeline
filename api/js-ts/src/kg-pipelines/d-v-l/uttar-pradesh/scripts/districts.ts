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
    name: "uttar pradesh",
    name_id: "in-sut-uttar-pradesh",
    vehicle_code: "UP",
  };

  const districtsList = [
    {
      names: ["Agra"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Agra_district",
    },
    {
      names: ["Aligarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Aligarh_district",
    },
    {
      names: ["Ambedkar Nagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ambedkar_Nagar_district",
    },
    {
      names: ["Amethi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Amethi_district",
    },
    {
      names: ["Amroha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Amroha_district",
    },
    {
      names: ["Auraiya"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Auraiya_district",
    },
    {
      names: ["Ayodhya"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Faizabad_district",
    },
    {
      names: ["Azamgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Azamgarh_district",
    },
    {
      names: ["Bagpat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bagpat_district",
    },
    {
      names: ["Bahraich"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bahraich_district",
    },
    {
      names: ["Ballia"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ballia_district",
    },
    {
      names: ["Balrampur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Balrampur_district,_Uttar_Pradesh",
    },
    {
      names: ["Banda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Banda_district_(India)",
    },
    {
      names: ["Barabanki"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Barabanki_district",
    },
    {
      names: ["Bareilly"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bareilly_district",
    },
    {
      names: ["Basti"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Basti_district",
    },
    {
      names: ["Bhadohi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhadohi_district",
    },
    {
      names: ["Bijnor"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bijnor_district",
    },
    {
      names: ["Budaun"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Budaun_district",
    },
    {
      names: ["Bulandshahr"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bulandshahr_district",
    },
    {
      names: ["Chandauli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chandauli_district",
    },
    {
      names: ["Chitrakoot"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chitrakoot_district",
    },
    {
      names: ["Deoria"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Deoria_district",
    },
    {
      names: ["Etah"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Etah_district",
    },
    {
      names: ["Etawah"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Etawah_district",
    },
    {
      names: ["Farrukhabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Farrukhabad_district",
    },
    {
      names: ["Fatehpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Fatehpur_district",
    },
    {
      names: ["Firozabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Firozabad_district",
    },
    {
      names: ["Gautam Buddha Nagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gautam_Buddh_Nagar_district",
    },
    {
      names: ["Ghaziabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ghaziabad_district,_India",
    },
    {
      names: ["Ghazipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ghazipur_district",
    },
    {
      names: ["Gonda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gonda_district",
    },
    {
      names: ["Gorakhpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gorakhpur_district",
    },
    {
      names: ["Hamirpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hamirpur_district,_Uttar_Pradesh",
    },
    {
      names: ["Hapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hapur_district",
    },
    {
      names: ["Hardoi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hardoi_district",
    },
    {
      names: ["Hathras"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hathras_district",
    },
    {
      names: ["Jalaun"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jalaun_district",
    },
    {
      names: ["Jaunpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jaunpur_district",
    },
    {
      names: ["Jhansi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jhansi_district",
    },
    {
      names: ["Kannauj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kannauj_district",
    },
    {
      names: ["Kanpur Dehat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kanpur_Dehat_district",
    },
    {
      names: ["Kanpur Nagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kanpur_Nagar_district",
    },
    {
      names: ["Kasganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kasganj_district",
    },
    {
      names: ["Kaushambi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kaushambi_district",
    },
    {
      names: ["Kushinagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kushinagar_district",
    },
    {
      names: ["Lakhimpur Kheri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Lakhimpur_Kheri_District",
    },
    {
      names: ["Lalitpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Lalitpur_district,_India",
    },
    {
      names: ["Lucknow"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Lucknow_district",
    },
    {
      names: ["Maharajganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Maharajganj_district",
    },
    {
      names: ["Mahoba"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mahoba_district",
    },
    {
      names: ["Mainpuri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mainpuri_district",
    },
    {
      names: ["Mathura"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mathura_district",
    },
    {
      names: ["Mau"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mau_district",
    },
    {
      names: ["Meerut"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Meerut_district",
    },
    {
      names: ["Mirzapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mirzapur_district",
    },
    {
      names: ["Moradabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Moradabad_district",
    },
    {
      names: ["Muzaffarnagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Muzaffarnagar_district",
    },
    {
      names: ["Pilibhit"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pilibhit_district",
    },
    {
      names: ["Pratapgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pratapgarh_district,_Uttar_Pradesh",
    },
    {
      names: ["Prayagraj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Allahabad_district",
    },
    {
      names: ["Raebareli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Raebareli_district",
    },
    {
      names: ["Rampur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rampur_district",
    },
    {
      names: ["Saharanpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Saharanpur_district",
    },
    {
      names: ["Sambhal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sambhal_district",
    },
    {
      names: ["Sant Kabir Nagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sant_Kabir_Nagar_district",
    },
    {
      names: ["Shahjahanpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shahjahanpur_district",
    },
    {
      names: ["Shamli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shamli_district",
    },
    {
      names: ["Shravasti"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shravasti_district",
    },
    {
      names: ["Siddharthnagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Siddharthnagar_district",
    },
    {
      names: ["Sitapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sitapur_district",
    },
    {
      names: ["Sonbhadra"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sonbhadra_district",
    },
    {
      names: ["Sultanpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sultanpur_district",
    },
    {
      names: ["Unnao"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Unnao_district",
    },
    {
      names: ["Varanasi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Varanasi_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

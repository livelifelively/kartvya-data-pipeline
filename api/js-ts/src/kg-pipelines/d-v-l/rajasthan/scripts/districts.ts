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
    name: "rajasthan",
    name_id: "in-sut-rajasthan",
    vehicle_code: "RJ",
  };

  const districtsList = [
    {
      names: ["Ajmer"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ajmer_district",
    },
    {
      names: ["Alwar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Alwar_district",
    },
    {
      names: ["Balotra"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Balotra_district",
    },
    {
      names: ["Banswara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Banswara_district",
    },
    {
      names: ["Baran"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Baran_district",
    },
    {
      names: ["Barmer"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Barmer_district",
    },
    {
      names: ["Beawar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Beawar_district",
    },
    {
      names: ["Bharatpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bharatpur_district",
    },
    {
      names: ["Bhilwara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhilwara_district",
    },
    {
      names: ["Bikaner"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bikaner_district",
    },
    {
      names: ["Bundi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bundi_district",
    },
    {
      names: ["Chittorgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chittorgarh_district",
    },
    {
      names: ["Churu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Churu_district",
    },
    {
      names: ["Dausa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dausa_district",
    },
    {
      names: ["Deeg"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Deeg_district",
    },
    {
      names: ["Didwana-Kuchaman"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Didwana-Kuchaman_district",
    },
    {
      names: ["Dholpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dholpur_district",
    },
    {
      names: ["Dungarpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dungarpur_district",
    },
    {
      names: ["Hanumangarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hanumangarh_district",
    },
    {
      names: ["Jaipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jaipur_district",
    },
    {
      names: ["Jaisalmer"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jaisalmer_district",
    },
    {
      names: ["Jalore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jalore_district",
    },
    {
      names: ["Jhalawar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jhalawar_district",
    },
    {
      names: ["Jhunjhunu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jhunjhunu_district",
    },
    {
      names: ["Jodhpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jodhpur_district",
    },
    {
      names: ["Karauli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Karauli_district",
    },
    {
      names: ["Khairthal-Tijara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khairthal-Tijara_district",
    },
    {
      names: ["Kotputli-Behror"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kotputli-Behror_district",
    },
    {
      names: ["Kota"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kota_district",
    },
    {
      names: ["Nagaur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nagaur_district",
    },
    {
      names: ["Pali"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pali_district",
    },
    {
      names: ["Phalodi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Phalodi_district",
    },
    {
      names: ["Pratapgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pratapgarh_district,_Rajasthan",
    },
    {
      names: ["Rajsamand"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajsamand_district",
    },
    {
      names: ["Salumbar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Salumbar_district",
    },
    {
      names: ["Sawai Madhopur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sawai_Madhopur_district",
    },
    {
      names: ["Sikar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sikar_district",
    },
    {
      names: ["Sirohi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sirohi_district",
    },
    {
      names: ["Sri Ganganagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sri_Ganganagar_district",
    },
    {
      names: ["Tonk"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tonk_district",
    },
    {
      names: ["Udaipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Udaipur_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

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
      names: ["Ganganagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ganganagar_Lok_Sabha_constituency",
    },
    {
      names: ["Bikaner"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bikaner_Lok_Sabha_constituency",
    },
    {
      names: ["Churu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Churu_Lok_Sabha_constituency",
    },
    {
      names: ["Jhunjhunu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jhunjhunu_Lok_Sabha_constituency",
    },
    {
      names: ["Sikar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sikar_Lok_Sabha_constituency",
    },
    {
      names: ["Jaipur Rural"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jaipur_Rural_Lok_Sabha_constituency",
    },
    {
      names: ["Jaipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jaipur_Lok_Sabha_constituency",
    },
    {
      names: ["Alwar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Alwar_Lok_Sabha_constituency",
    },
    {
      names: ["Bharatpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bharatpur_Lok_Sabha_constituency",
    },
    {
      names: ["Karauli–Dholpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Karauli%E2%80%93Dholpur_Lok_Sabha_constituency",
    },
    {
      names: ["Dausa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dausa_Lok_Sabha_constituency",
    },
    {
      names: ["Tonk–Sawai Madhopur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tonk%E2%80%93Sawai_Madhopur_Lok_Sabha_constituency",
    },
    {
      names: ["Ajmer"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ajmer_Lok_Sabha_constituency",
    },
    {
      names: ["Nagaur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nagaur_Lok_Sabha_constituency",
    },
    {
      names: ["Pali"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pali_Lok_Sabha_constituency",
    },
    {
      names: ["Jodhpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jodhpur_Lok_Sabha_constituency",
    },
    {
      names: ["Barmer"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Barmer_Lok_Sabha_constituency",
    },
    {
      names: ["Jalore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jalore_Lok_Sabha_constituency",
    },
    {
      names: ["Udaipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Udaipur_Lok_Sabha_constituency",
    },
    {
      names: ["Banswara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Banswara_Lok_Sabha_constituency",
    },
    {
      names: ["Chittorgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chittorgarh_Lok_Sabha_constituency",
    },
    {
      names: ["Rajsamand"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajsamand_Lok_Sabha_constituency",
    },
    {
      names: ["Bhilwara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhilwara_Lok_Sabha_constituency",
    },
    {
      names: ["Kota"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kota_Lok_Sabha_constituency",
    },
    {
      names: ["Jhalawar–Baran"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jhalawar%E2%80%93Baran_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

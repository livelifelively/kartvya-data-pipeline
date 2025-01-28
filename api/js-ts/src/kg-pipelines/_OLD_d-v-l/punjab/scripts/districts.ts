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
    name: "punjab",
    name_id: "in-sut-punjab",
    vehicle_code: "PB",
  };

  const districtsList = [
    {
      names: ["Amritsar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Amritsar_district",
    },
    {
      names: ["Barnala"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Barnala_district",
    },
    {
      names: ["Bathinda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bathinda_district",
    },
    {
      names: ["Firozpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Firozpur_district",
    },
    {
      names: ["Faridkot"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Faridkot_district",
    },
    {
      names: ["Fatehgarh Sahib"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Fatehgarh_Sahib_district",
    },
    {
      names: ["Fazilka"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Fazilka_district",
    },
    {
      names: ["Gurdaspur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gurdaspur_district",
    },
    {
      names: ["Hoshiarpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hoshiarpur_district",
    },
    {
      names: ["Jalandhar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jalandhar_district",
    },
    {
      names: ["Kapurthala"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kapurthala_district",
    },
    {
      names: ["Ludhiana"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ludhiana_district",
    },
    {
      names: ["Malerkotla"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Malerkotla_district",
    },
    {
      names: ["Mansa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mansa_district,_India",
    },
    {
      names: ["Moga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Moga_district",
    },
    {
      names: ["Sri Muktsar Sahib"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sri_Muktsar_Sahib_district",
    },
    {
      names: ["Pathankot"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pathankot_district",
    },
    {
      names: ["Patiala"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Patiala_district",
    },
    {
      names: ["Rupnagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rupnagar_district",
    },
    {
      names: ["Sahibzada Ajit Singh Nagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sahibzada_Ajit_Singh_Nagar_district",
    },
    {
      names: ["Sangrur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sangrur_district",
    },
    {
      names: ["Shahid Bhagat Singh Nagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shahid_Bhagat_Singh_Nagar_district",
    },
    {
      names: ["Tarn Taran"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tarn_Taran_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

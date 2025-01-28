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
    name: "telangana",
    name_id: "in-sut-telangana",
    vehicle_code: "TG",
  };

  const districtsList = [
    {
      names: ["Adilabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Adilabad_district",
    },
    {
      names: ["Bhadradri Kothagudem"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhadradri_Kothagudem",
    },
    {
      names: ["Hanamkonda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Warangal_Urban_district",
    },
    {
      names: ["Hyderabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hyderabad_district,_India",
    },
    {
      names: ["Jagtial"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jagitial_district",
    },
    {
      names: ["Jangaon"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jangaon_district",
    },
    {
      names: ["Jayashankar Bhupalpally"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jayashankar_Bhupalpally_district",
    },
    {
      names: ["Jogulamba Gadwal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jogulamba_Gadwal",
    },
    {
      names: ["Kamareddy"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kamareddy_district",
    },
    {
      names: ["Karimnagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Karimnagar_district",
    },
    {
      names: ["Khammam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khammam_district",
    },
    {
      names: ["Kumuram Bheem Asifabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Komaram_Bheem_district",
    },
    {
      names: ["Mahabubabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mahabubabad_district",
    },
    {
      names: ["Mahbubnagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mahabub_Nagar_district",
    },
    {
      names: ["Mancherial"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mancherial_district",
    },
    {
      names: ["Medak"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Medak_district",
    },
    {
      names: ["Medchal–Malkajgiri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Medchal%E2%80%93Malkajgiri",
    },
    {
      names: ["Mulugu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mulugu_district",
    },
    {
      names: ["Nalgonda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nalgonda_district",
    },
    {
      names: ["Narayanpet"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Narayanpet_district",
    },
    {
      names: ["Nagarkurnool"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nagarkurnool_district",
    },
    {
      names: ["Nirmal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nirmal_district",
    },
    {
      names: ["Nizamabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nizamabad_district",
    },
    {
      names: ["Peddapalli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Peddapalli_district",
    },
    {
      names: ["Rajanna Sircilla"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajanna_Sircilla",
    },
    {
      names: ["Ranga Reddy"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ranga_Reddy_district",
    },
    {
      names: ["Sangareddy"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sangareddy_district",
    },
    {
      names: ["Siddipet"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Siddipet_district",
    },
    {
      names: ["Suryapet"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Suryapet_district",
    },
    {
      names: ["Vikarabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vikarabad_district",
    },
    {
      names: ["Wanaparthy"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Wanaparthy_district",
    },
    {
      names: ["Warangal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Warangal_Rural_district",
    },
    {
      names: ["Yadadri Bhuvanagiri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Yadadri_Bhuvanagiri",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

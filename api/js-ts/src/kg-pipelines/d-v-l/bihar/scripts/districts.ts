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
    {
      name: "Fetch District SOI Geo Features",
      function: fetchDistrictSOIGeoFeatures,
      key: "STATE_DISTRICTS_SOI_GEO_DATA",
      input: null,
    },
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
    state_name: "bihar",
    name_id: "in-sut-bihar",
    vehicle_code: "BR",
  };

  const districtsList = [
    {
      name: "Srikakulam",
      wikipedia_page: "https://en.wikipedia.org/wiki/Srikakulam_district",
    },
    {
      name: "Parvathipuram Manyam",
      wikipedia_page: "https://en.wikipedia.org/wiki/Parvathipuram_Manyam_district",
    },
    {
      name: "Vizianagaram",
      wikipedia_page: "https://en.wikipedia.org/wiki/Vizianagaram_district",
    },
    {
      name: "Visakhapatnam",
      wikipedia_page: "https://en.wikipedia.org/wiki/Visakhapatnam_district",
    },
    {
      name: "Anakapalli",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anakapalli_district",
    },
    {
      name: "Alluri Sitharama Raju",
      wikipedia_page: "https://en.wikipedia.org/wiki/Alluri_Sitharama_Raju_district",
    },
    {
      name: "Kakinada",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kakinada_district",
    },
    {
      name: "East Godavari",
      wikipedia_page: "https://en.wikipedia.org/wiki/East_Godavari_district",
    },
    {
      name: "Konaseema",
      wikipedia_page: "https://en.wikipedia.org/wiki/Konaseema_district",
    },
    {
      name: "Eluru",
      wikipedia_page: "https://en.wikipedia.org/wiki/Eluru_district",
    },
    {
      name: "West Godavari",
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Godavari_district",
    },
    {
      name: "NTR",
      wikipedia_page: "https://en.wikipedia.org/wiki/NTR_district",
    },
    {
      name: "Krishna",
      wikipedia_page: "https://en.wikipedia.org/wiki/Krishna_district",
    },
    {
      name: "Guntur",
      wikipedia_page: "https://en.wikipedia.org/wiki/Guntur_district",
    },
    {
      name: "Palnadu",
      wikipedia_page: "https://en.wikipedia.org/wiki/Palnadu_district",
    },
    {
      name: "Bapatla",
      wikipedia_page: "https://en.wikipedia.org/wiki/Bapatla_district",
    },
    {
      name: "Prakasam",
      wikipedia_page: "https://en.wikipedia.org/wiki/Prakasam_district",
    },
    {
      name: "Sri Potti Sriramulu Nellore",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nellore_district",
    },
    {
      name: "Kurnool",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kurnool_district",
    },
    {
      name: "Nandyal",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nandyal_district",
    },
    {
      name: "Y.S.R.",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kadapa_district",
    },
    {
      name: "Anantpur",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anantapur_district",
    },
    {
      name: "Sri Sathya Sai",
      wikipedia_page: "https://en.wikipedia.org/wiki/Sri_Sathya_Sai_district",
    },
    {
      name: "Annamayya",
      wikipedia_page: "https://en.wikipedia.org/wiki/Annamayya_district",
    },
    {
      name: "Tirupati",
      wikipedia_page: "https://en.wikipedia.org/wiki/Tirupati_district",
    },
    {
      name: "Chittoor",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chittoor_district",
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

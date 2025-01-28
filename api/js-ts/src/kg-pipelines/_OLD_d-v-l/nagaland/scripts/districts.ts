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
    name: "nagaland",
    name_id: "in-sut-nagaland",
    vehicle_code: "NL",
  };

  const districtsList = [
    {
      names: ["Chümoukedima District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Ch%C3%BCmoukedima_district"],
    },
    {
      names: ["Dimapur District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Dimapur_district"],
    },
    {
      names: ["Kiphire District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Kiphire_district"],
    },
    {
      names: ["Kohima District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Kohima_district"],
    },
    {
      names: ["Longleng District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Longleng_district"],
    },
    {
      names: ["Meluri District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Meluri_district"],
    },
    {
      names: ["Mokokchung District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Mokokchung_district"],
    },
    {
      names: ["Mon District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Mon_district"],
    },
    {
      names: ["Niuland District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Niuland_district"],
    },
    {
      names: ["Noklak District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Noklak_district"],
    },
    {
      names: ["Peren District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Peren_district"],
    },
    {
      names: ["Phek District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Phek_district"],
    },
    {
      names: ["Shamator District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Shamator_district"],
    },
    {
      names: ["Tseminyü District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Tseminy%C3%BC_district"],
    },
    {
      names: ["Tuensang District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Tuensang_district"],
    },
    {
      names: ["Wokha District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Wokha_district"],
    },
    {
      names: ["Zünheboto District"],
      wikipedia_page: ["https://en.wikipedia.org/wiki/Z%C3%BCnheboto_district"],
    },
  ];

  const saveToKG = true;

  await districtsPipeline(stateUT, districtsList, saveToKG);
})();

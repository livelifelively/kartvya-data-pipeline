import path from "path";
import { PipelineStep, runPipeline } from "../../../../pipeline/pipeline";
import {
  addLoksabhaConstituencyDataToKnowledgeGraph,
  fetchLoksabhaConstituenciesWikiDetails,
  fetchLoksabhaConstituencyECIGeoFeatures,
  transformLoksabhaConstituenciesWikipediaData,
  transformLoksabhaConstituenciesWithECIGeo,
} from "../../../../pipeline/loksabha-pipeline";
import { upsert_Name_ } from "../../../../knowledge-graph/name/name.update";
import { createNodeType } from "../../../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../../../knowledge-graph/generic/generic.utils";

async function loksabhaConstituenciesPipeline(
  stateUT: any,
  loksabhaConstituenciesList: any,
  saveToKG: boolean = false
) {
  // console.log("LOKSABHA PROCESSING INITIALIZED: ", stateUT.name);
  const steps: PipelineStep[] = [
    // // DONT NEED THIS STEP, ALREADY INPUT IS IN THE REQUIRED FORMAT
    // {
    //   name: "Fetch State Loksabha_Constituency",
    //   function: fetchStateLoksabhaConstituencies,
    //   key: "STATE_LOKSABHA_LIST",
    //   input: stateUT,
    // },
    {
      name: "Fetch Loksabha_Constituency Wiki Details",
      function: fetchLoksabhaConstituenciesWikiDetails,
      key: "STATE_LOKSABHA_CONSTITUENCY_WIKI_DATA",
      input: null, // Will be set after the first step
    },
    {
      name: "Fetch LoksabhaConstituency ECI Geo Features",
      function: fetchLoksabhaConstituencyECIGeoFeatures,
      key: "STATE_LOKSABHA_CONSTITUENCY_ECI_GEO_DATA",
      input: stateUT,
    },
    {
      name: "Append Wikipedia Data",
      function: transformLoksabhaConstituenciesWikipediaData,
      input: null, // Will be set after the fifth step
      key: "APPEND_WIKIPEDIA_DATA_TRANSFORM_STATE_LOKSABHA_CONSTITUENCY_DATA",
    },
    {
      name: "Transform Loksabha_Constituency with ECI Geo",
      function: transformLoksabhaConstituenciesWithECIGeo,
      input: null, // Will be set after the sixth and seventh steps
      key: "APPEND_ECI_DATA_TRANSFORM_STATE_LOKSABHA_CONSTITUENCY_DATA",
    },
  ];

  let outputs: Record<string, any> = {
    stateUT,
    // loksabhaConstituenciesList,
    stateLoksabhaConstituencies: loksabhaConstituenciesList,
    loksabhaConstituenciesCount: 0,
    loksabhaConstituenciesWikiDetails: [],
    loksabhaConstituenciesWikiDetailsFailed: [],
    loksabhaConstituencyFeaturesECI: [],
    transformedLoksabhaConstituenciesWikipedia: [],
    loksabhaConstituenciesNotTransformedWikipedia: [],
    transformedLoksabhaConstituenciesECIGeo: [],
    unmatchedLoksabhaConstituenciesECIGeo: [],
  };

  if (saveToKG) {
    steps.push({
      name: "Save Loksabha_Constituency to KnowledgeGraph",
      function: addLoksabhaConstituencyDataToKnowledgeGraph,
      input: null,
      key: "SAVE_DISTRICT_DATA_TO_KNOWLEDGE_GRAPH",
    });
  }

  const loksabhaConstituenciesProgressDir = path.join(__dirname, "../", "loksabha-constituency-pipeline-logs");
  const progressStatusFile = path.join(loksabhaConstituenciesProgressDir, "progressStatus.json");

  try {
    const lastStepOutput = await runPipeline(steps, outputs, loksabhaConstituenciesProgressDir, progressStatusFile);

    if (saveToKG) return lastStepOutput.savedToKnowledgeGraph;
    return lastStepOutput.transformedLoksabhaConstituenciesECIGeo;
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

(async () => {
  const stateUT = {
    name: "jharkhand",
    name_id: "in-sut-jharkhand",
    vehicle_code: "JH",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Rajmahal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajmahal_Lok_Sabha_constituency",
    },
    {
      names: ["Dumka"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dumka_Lok_Sabha_constituency",
    },
    {
      names: ["Godda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Godda_Lok_Sabha_constituency",
    },
    {
      names: ["Chatra"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chatra_Lok_Sabha_constituency",
    },
    {
      names: ["Koderma"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kodarma_Lok_Sabha_constituency",
    },
    {
      names: ["Giridih"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Giridih_Lok_Sabha_constituency",
    },
    {
      names: ["Dhanbad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dhanbad_Lok_Sabha_constituency",
    },
    {
      names: ["Ranchi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ranchi_Lok_Sabha_constituency",
    },
    {
      names: ["Jamshedpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jamshedpur_Lok_Sabha_constituency",
    },
    {
      names: ["Singhbhum"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Singhbhum_Lok_Sabha_constituency",
    },
    {
      names: ["Khunti"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khunti_Lok_Sabha_constituency",
    },
    {
      names: ["Lohardaga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Lohardaga_Lok_Sabha_constituency",
    },
    {
      names: ["Palamu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Palamu_Lok_Sabha_constituency",
    },
    {
      names: ["Hazaribagh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hazaribagh_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

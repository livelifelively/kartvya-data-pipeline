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
    name: "assam",
    name_id: "in-sut-assam",
    vehicle_code: "AS",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Kokrajhar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kokrajhar_Lok_Sabha_constituency",
    },
    {
      names: ["Dhubri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dhubri_Lok_Sabha_constituency",
    },
    {
      names: ["Barpeta"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Barpeta_Lok_Sabha_constituency",
    },
    {
      names: ["Darrang-Udalguri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Darrang%E2%80%93Udalguri_Lok_Sabha_constituency",
    },
    {
      names: ["Guwahati"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Guwahati_Lok_Sabha_constituency",
    },
    {
      names: ["Diphu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Diphu_Lok_Sabha_constituency",
    },
    {
      names: ["Karimganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Karimganj_Lok_Sabha_constituency",
    },
    {
      names: ["Silchar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Silchar_Lok_Sabha_constituency",
    },
    {
      names: ["Nowgong"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nagaon_Lok_Sabha_constituency",
    },
    {
      names: ["Kaziranga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kaziranga_Lok_Sabha_constituency",
    },
    {
      names: ["Sonitpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sonitpur_Lok_Sabha_constituency",
    },
    {
      names: ["Lakhimpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Lakhimpur_Lok_Sabha_constituency",
    },
    {
      names: ["Dilbrugarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dibrugarh_Lok_Sabha_constituency",
    },
    {
      names: ["Jorhat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jorhat_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

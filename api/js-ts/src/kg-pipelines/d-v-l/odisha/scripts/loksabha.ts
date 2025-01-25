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
    name: "odisha",
    name_id: "in-sut-odisha",
    vehicle_code: "OD",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Bargarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bargarh_Lok_Sabha_constituency",
    },
    {
      names: ["Sundargarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sundargarh_Lok_Sabha_constituency",
    },
    {
      names: ["Sambalpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sambalpur_Lok_Sabha_constituency",
    },
    {
      names: ["Keonjhar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Keonjhar_Lok_Sabha_constituency",
    },
    {
      names: ["Mayurbhanj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mayurbhanj_Lok_Sabha_constituency",
    },
    {
      names: ["Balasore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Balasore_Lok_Sabha_constituency",
    },
    {
      names: ["Bhadrak"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhadrak_Lok_Sabha_constituency",
    },
    {
      names: ["Jajpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jajpur_Lok_Sabha_constituency",
    },
    {
      names: ["Dhenkanal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dhenkanal_Lok_Sabha_constituency",
    },
    {
      names: ["Bolangir"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bolangir_Lok_Sabha_constituency",
    },
    {
      names: ["Kalahandi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kalahandi_Lok_Sabha_constituency",
    },
    {
      names: ["Nabarangpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nabarangpur_Lok_Sabha_constituency",
    },
    {
      names: ["Kandhamal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kandhamal_Lok_Sabha_constituency",
    },
    {
      names: ["Cuttack"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Cuttack_Lok_Sabha_constituency",
    },
    {
      names: ["Kendrapara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kendrapara_Lok_Sabha_constituency",
    },
    {
      names: ["Jagatsinghpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jagatsinghpur_Lok_Sabha_constituency",
    },
    {
      names: ["Puri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Puri_Lok_Sabha_constituency",
    },
    {
      names: ["Bhubaneswar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhubaneswar_Lok_Sabha_constituency",
    },
    {
      names: ["Aska"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Aska_Lok_Sabha_constituency",
    },
    {
      names: ["Berhampur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Berhampur_Lok_Sabha_constituency",
    },
    {
      names: ["Koraput"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Koraput_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

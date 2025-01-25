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
    name: "madhya pradesh",
    name_id: "in-sut-madhya-pradesh",
    vehicle_code: "MP",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Morena"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Morena_Lok_Sabha_constituency",
    },
    {
      names: ["Bhind"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhind_Lok_Sabha_constituency",
    },
    {
      names: ["Gwalior"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gwalior_Lok_Sabha_constituency",
    },
    {
      names: ["Guna"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Guna_Lok_Sabha_constituency",
    },
    {
      names: ["Sagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sagar_Lok_Sabha_constituency",
    },
    {
      names: ["Tikamgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tikamgarh_Lok_Sabha_constituency",
    },
    {
      names: ["Damoh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Damoh_Lok_Sabha_constituency",
    },
    {
      names: ["Khajuraho"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khajuraho_Lok_Sabha_constituency",
    },
    {
      names: ["Satna"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Satna_Lok_Sabha_constituency",
    },
    {
      names: ["Rewa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rewa_Lok_Sabha_constituency",
    },
    {
      names: ["Sidhi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sidhi_Lok_Sabha_constituency",
    },
    {
      names: ["Shahdol"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shahdol_Lok_Sabha_constituency",
    },
    {
      names: ["Jabalpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jabalpur_Lok_Sabha_constituency",
    },
    {
      names: ["Mandla"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mandla_Lok_Sabha_constituency",
    },
    {
      names: ["Balaghat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Balaghat_Lok_Sabha_constituency",
    },
    {
      names: ["Chhindwara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chhindwara_Lok_Sabha_constituency",
    },
    {
      names: ["Narmadapuram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hoshangabad_Lok_Sabha_constituency",
    },
    {
      names: ["Vidisha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vidisha_Lok_Sabha_constituency",
    },
    {
      names: ["Bhopal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhopal_Lok_Sabha_constituency",
    },
    {
      names: ["Rajgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajgarh_Lok_Sabha_constituency",
    },
    {
      names: ["Dewas"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dewas_Lok_Sabha_constituency",
    },
    {
      names: ["Ujjain"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ujjain_Lok_Sabha_constituency",
    },
    {
      names: ["Mandsaur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mandsaur_Lok_Sabha_constituency",
    },
    {
      names: ["Ratlam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ratlam_Lok_Sabha_constituency",
    },
    {
      names: ["Dhar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dhar_Lok_Sabha_constituency",
    },
    {
      names: ["Indore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Indore_Lok_Sabha_constituency",
    },
    {
      names: ["Khargone"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khargone_Lok_Sabha_constituency",
    },
    {
      names: ["Khandwa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khandwa_Lok_Sabha_constituency",
    },
    {
      names: ["Betul"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Betul_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

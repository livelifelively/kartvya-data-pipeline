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
    name: "andhra pradesh",
    name_id: "in-sut-andhra-pradesh",
    vehicle_code: "AP",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Araku"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency",
    },
    {
      names: ["Srikakulam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Srikakulam_Lok_Sabha_constituency",
    },
    {
      names: ["Vizianagaram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
    },
    {
      names: ["Visakhapatnam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Visakhapatnam_Lok_Sabha_constituency",
    },
    {
      names: ["Anakapalli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Anakapalli_Lok_Sabha_constituency",
    },
    {
      names: ["Kakinada"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency",
    },
    {
      names: ["Amalapuram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Amalapuram_Lok_Sabha_constituency",
    },
    {
      names: ["Rajahmundry"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
    },
    {
      names: ["Narasapuram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
    },
    {
      names: ["Eluru"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency",
    },
    {
      names: ["Machilipatnam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
    },
    {
      names: ["Vijayawada"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vijayawada_Lok_Sabha_constituency",
    },
    {
      names: ["Guntur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency",
    },
    {
      names: ["Narasaraopet"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Narasaraopet_Lok_Sabha_constituency",
    },
    {
      names: ["Bapatla"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency",
    },
    {
      names: ["Ongole"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency",
    },
    {
      names: ["Nandyal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nandyal_Lok_Sabha_constituency",
    },
    {
      names: ["Kurnool"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency",
    },
    {
      names: ["Anantapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
    },
    {
      names: ["Hindupur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
    },
    {
      names: ["Kadapa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kadapa_Lok_Sabha_constituency",
    },
    {
      names: ["Nellore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency",
    },
    {
      names: ["Tirupati"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tirupati_Lok_Sabha_constituency",
    },
    {
      names: ["Rajampet"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajampet_Lok_Sabha_constituency",
    },
    {
      names: ["Chittoor"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

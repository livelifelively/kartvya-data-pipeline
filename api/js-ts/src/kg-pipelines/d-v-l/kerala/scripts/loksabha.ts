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
    name: "kerala",
    name_id: "in-sut-kerala",
    vehicle_code: "KL",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Kasaragod"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kasaragod_Lok_Sabha_constituency",
    },
    {
      names: ["Kannur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kannur_Lok_Sabha_constituency",
    },
    {
      names: ["Vatakara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vatakara_Lok_Sabha_constituency",
    },
    {
      names: ["Wayanad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Wayanad_Lok_Sabha_constituency",
    },
    {
      names: ["Kozhikode"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kozhikode_Lok_Sabha_constituency",
    },
    {
      names: ["Malappuram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Malappuram_Lok_Sabha_constituency",
    },
    {
      names: ["Ponnani"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ponnani_Lok_Sabha_constituency",
    },
    {
      names: ["Palakkad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Palakkad_Lok_Sabha_constituency",
    },
    {
      names: ["Alathur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Alathur_Lok_Sabha_constituency",
    },
    {
      names: ["Thrissur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Thrissur_Lok_Sabha_constituency",
    },
    {
      names: ["Chalakudy"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chalakudy_Lok_Sabha_constituency",
    },
    {
      names: ["Ernakulam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ernakulam_Lok_Sabha_constituency",
    },
    {
      names: ["Idukki"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Idukki_Lok_Sabha_constituency",
    },
    {
      names: ["Kottayam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kottayam_Lok_Sabha_constituency",
    },
    {
      names: ["Alappuzha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Alappuzha_Lok_Sabha_constituency",
    },
    {
      names: ["Mavelikara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mavelikara_Lok_Sabha_constituency",
    },
    {
      names: ["Pathanamthitta"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pathanamthitta_Lok_Sabha_constituency",
    },
    {
      names: ["Kollam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kollam_Lok_Sabha_constituency",
    },
    {
      names: ["Attingal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Attingal_Lok_Sabha_constituency",
    },
    {
      names: ["Thiruvananthapuram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Thiruvananthapuram_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

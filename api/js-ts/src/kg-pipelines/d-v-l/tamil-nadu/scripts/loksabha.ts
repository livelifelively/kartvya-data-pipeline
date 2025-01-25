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
    name: "tamil nadu",
    name_id: "in-sut-tamil-nadu",
    vehicle_code: "TN",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Thiruvallur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tiruvallur_Lok_Sabha_constituency",
    },
    {
      names: ["Chennai North"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chennai_North_Lok_Sabha_constituency",
    },
    {
      names: ["Chennai South"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chennai_South_Lok_Sabha_constituency",
    },
    {
      names: ["Chennai Central"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chennai_Central_Lok_Sabha_constituency",
    },
    {
      names: ["Sriperumbudur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sriperumbudur_Lok_Sabha_constituency",
    },
    {
      names: ["Kancheepuram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kancheepuram_Lok_Sabha_constituency",
    },
    {
      names: ["Arakkonam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Arakkonam_Lok_Sabha_constituency",
    },
    {
      names: ["Vellore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vellore_Lok_Sabha_constituency",
    },
    {
      names: ["Krishnagiri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Krishnagiri_Lok_Sabha_constituency",
    },
    {
      names: ["Dharmapuri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dharmapuri_Lok_Sabha_constituency",
    },
    {
      names: ["Tiruvannamalai"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tiruvannamalai_Lok_Sabha_constituency",
    },
    {
      names: ["Arani"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Arani_Lok_Sabha_constituency",
    },
    {
      names: ["Villupuram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Viluppuram_Lok_Sabha_constituency",
    },
    {
      names: ["Kallakurichi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kallakurichi_Lok_Sabha_constituency",
    },
    {
      names: ["Salem"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Salem_Lok_Sabha_constituency",
    },
    {
      names: ["Namakkal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Namakkal_Lok_Sabha_constituency",
    },
    {
      names: ["Erode"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Erode_Lok_Sabha_constituency",
    },
    {
      names: ["Tiruppur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tiruppur_Lok_Sabha_constituency",
    },
    {
      names: ["Nilgiris"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nilgiris_Lok_Sabha_constituency",
    },
    {
      names: ["Coimbatore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Coimbatore_Lok_Sabha_constituency",
    },
    {
      names: ["Pollachi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pollachi_Lok_Sabha_constituency",
    },
    {
      names: ["Dindigul"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dindigul_Lok_Sabha_constituency",
    },
    {
      names: ["Karur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Karur_Lok_Sabha_constituency",
    },
    {
      names: ["Tiruchirappalli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tiruchirappalli_Lok_Sabha_constituency",
    },
    {
      names: ["Perambalur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Perambalur_Lok_Sabha_constituency",
    },
    {
      names: ["Cuddalore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Cuddalore_Lok_Sabha_constituency",
    },
    {
      names: ["Chidambaram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chidambaram_Lok_Sabha_constituency",
    },
    {
      names: ["Mayiladuturai"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mayiladuthurai_Lok_Sabha_constituency",
    },
    {
      names: ["Nagapattinam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nagapattinam_Lok_Sabha_constituency",
    },
    {
      names: ["Thanjavur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Thanjavur_Lok_Sabha_constituency",
    },
    {
      names: ["Sivaganga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sivaganga_Lok_Sabha_constituency",
    },
    {
      names: ["Madurai"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Madurai_Lok_Sabha_constituency",
    },
    {
      names: ["Theni"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Theni_Lok_Sabha_constituency",
    },
    {
      names: ["Virudhunagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Virudhunagar_Lok_Sabha_constituency",
    },
    {
      names: ["Ramanathapuram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ramanathapuram_Lok_Sabha_constituency",
    },
    {
      names: ["Thoothukkudi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Thoothukkudi_Lok_Sabha_constituency",
    },
    {
      names: ["Tenkasi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tenkasi_Lok_Sabha_constituency",
    },
    {
      names: ["Tirunelveli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tirunelveli_Lok_Sabha_constituency",
    },
    {
      names: ["Kanniyakumari"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kanniyakumari_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

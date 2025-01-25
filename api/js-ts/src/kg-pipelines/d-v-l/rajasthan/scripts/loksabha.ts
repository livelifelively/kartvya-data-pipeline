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
    name: "rajasthan",
    name_id: "in-sut-rajasthan",
    vehicle_code: "RJ",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Ganganagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ganganagar_Lok_Sabha_constituency",
    },
    {
      names: ["Bikaner"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bikaner_Lok_Sabha_constituency",
    },
    {
      names: ["Churu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Churu_Lok_Sabha_constituency",
    },
    {
      names: ["Jhunjhunu"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jhunjhunu_Lok_Sabha_constituency",
    },
    {
      names: ["Sikar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sikar_Lok_Sabha_constituency",
    },
    {
      names: ["Jaipur Rural"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jaipur_Rural_Lok_Sabha_constituency",
    },
    {
      names: ["Jaipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jaipur_Lok_Sabha_constituency",
    },
    {
      names: ["Alwar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Alwar_Lok_Sabha_constituency",
    },
    {
      names: ["Bharatpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bharatpur_Lok_Sabha_constituency",
    },
    {
      names: ["Karauli–Dholpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Karauli%E2%80%93Dholpur_Lok_Sabha_constituency",
    },
    {
      names: ["Dausa"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dausa_Lok_Sabha_constituency",
    },
    {
      names: ["Tonk–Sawai Madhopur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tonk%E2%80%93Sawai_Madhopur_Lok_Sabha_constituency",
    },
    {
      names: ["Ajmer"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ajmer_Lok_Sabha_constituency",
    },
    {
      names: ["Nagaur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nagaur_Lok_Sabha_constituency",
    },
    {
      names: ["Pali"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pali_Lok_Sabha_constituency",
    },
    {
      names: ["Jodhpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jodhpur_Lok_Sabha_constituency",
    },
    {
      names: ["Barmer"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Barmer_Lok_Sabha_constituency",
    },
    {
      names: ["Jalore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jalore_Lok_Sabha_constituency",
    },
    {
      names: ["Udaipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Udaipur_Lok_Sabha_constituency",
    },
    {
      names: ["Banswara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Banswara_Lok_Sabha_constituency",
    },
    {
      names: ["Chittorgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chittorgarh_Lok_Sabha_constituency",
    },
    {
      names: ["Rajsamand"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajsamand_Lok_Sabha_constituency",
    },
    {
      names: ["Bhilwara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhilwara_Lok_Sabha_constituency",
    },
    {
      names: ["Kota"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kota_Lok_Sabha_constituency",
    },
    {
      names: ["Jhalawar–Baran"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jhalawar%E2%80%93Baran_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

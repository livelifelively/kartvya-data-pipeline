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
    name: "gujarat",
    name_id: "in-sut-gujarat",
    vehicle_code: "GJ",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Kachchh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kachchh_Lok_Sabha_constituency",
    },
    {
      names: ["Banaskantha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Banaskantha_Lok_Sabha_constituency",
    },
    {
      names: ["Patan"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Patan_Lok_Sabha_constituency",
    },
    {
      names: ["Mahesana"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mahesana_Lok_Sabha_constituency",
    },
    {
      names: ["Sabarkantha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sabarkantha_Lok_Sabha_constituency",
    },
    {
      names: ["Gandhinagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gandhinagar_Lok_Sabha_constituency",
    },
    {
      names: ["Ahmedabad East"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ahmedabad_East_Lok_Sabha_constituency",
    },
    {
      names: ["Ahmedabad West"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ahmedabad_West_Lok_Sabha_constituency",
    },
    {
      names: ["Surendranagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Surendranagar_Lok_Sabha_constituency",
    },
    {
      names: ["Rajkot"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajkot_Lok_Sabha_constituency",
    },
    {
      names: ["Porbandar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Porbandar_Lok_Sabha_constituency",
    },
    {
      names: ["Jamnagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jamnagar_Lok_Sabha_constituency",
    },
    {
      names: ["Junagadh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Junagadh_Lok_Sabha_constituency",
    },
    {
      names: ["Amreli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Amreli_Lok_Sabha_constituency",
    },
    {
      names: ["Bhavnagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhavnagar_Lok_Sabha_constituency",
    },
    {
      names: ["Anand"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Anand_Lok_Sabha_constituency",
    },
    {
      names: ["Kheda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kheda_Lok_Sabha_constituency",
    },
    {
      names: ["Panchmahal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Panchmahal_Lok_Sabha_constituency",
    },
    {
      names: ["Dahod"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dahod_Lok_Sabha_constituency",
    },
    {
      names: ["Vadodara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vadodara_Lok_Sabha_constituency",
    },
    {
      names: ["Chhota Udaipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chhota_Udaipur_Lok_Sabha_constituency",
    },
    {
      names: ["Bharuch"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bharuch_Lok_Sabha_constituency",
    },
    {
      names: ["Bardoli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bardoli_Lok_Sabha_constituency",
    },
    {
      names: ["Surat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Surat_Lok_Sabha_constituency",
    },
    {
      names: ["Navsari"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Navsari_Lok_Sabha_constituency",
    },
    {
      names: ["Valsad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Valsad_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

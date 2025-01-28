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
    name: "maharashtra",
    name_id: "in-sut-maharashtra",
    vehicle_code: "MH",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Nandurbar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nandurbar_Lok_Sabha_constituency",
    },
    {
      names: ["Dhule"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dhule_Lok_Sabha_constituency",
    },
    {
      names: ["Jalgaon"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jalgaon_Lok_Sabha_constituency",
    },
    {
      names: ["Raver"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Raver_Lok_Sabha_constituency",
    },
    {
      names: ["Buldhana"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Buldhana_Lok_Sabha_constituency",
    },
    {
      names: ["Akola"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Akola_Lok_Sabha_constituency",
    },
    {
      names: ["Amravati"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Amravati_Lok_Sabha_constituency",
    },
    {
      names: ["Wardha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Wardha_Lok_Sabha_constituency",
    },
    {
      names: ["Ramtek"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ramtek_Lok_Sabha_constituency",
    },
    {
      names: ["Nagpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nagpur_Lok_Sabha_constituency",
    },
    {
      names: ["Bhandara–Gondiya"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhandara%E2%80%93Gondiya_Lok_Sabha_constituency",
    },
    {
      names: ["Gadchiroli–Chimur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gadchiroli%E2%80%93Chimur_Lok_Sabha_constituency",
    },
    {
      names: ["Chandrapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chandrapur_Lok_Sabha_constituency",
    },
    {
      names: ["Yavatmal–Washim"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Yavatmal%E2%80%93Washim_Lok_Sabha_constituency",
    },
    {
      names: ["Hingoli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hingoli_Lok_Sabha_constituency",
    },
    {
      names: ["Nanded"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nanded_Lok_Sabha_constituency",
    },
    {
      names: ["Parbhani"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Parbhani_Lok_Sabha_constituency",
    },
    {
      names: ["Jalna"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jalna_Lok_Sabha_constituency",
    },
    {
      names: ["Aurangabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Aurangabad,_Maharashtra_Lok_Sabha_constituency",
    },
    {
      names: ["Dindori"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dindori_Lok_Sabha_constituency",
    },
    {
      names: ["Nashik"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nashik_Lok_Sabha_constituency",
    },
    {
      names: ["Palghar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Palghar_Lok_Sabha_constituency",
    },
    {
      names: ["Bhiwandi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhiwandi_Lok_Sabha_constituency",
    },
    {
      names: ["Kalyan"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kalyan_Lok_Sabha_constituency",
    },
    {
      names: ["Thane"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Thane_Lok_Sabha_constituency",
    },
    {
      names: ["Mumbai North"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mumbai_North_Lok_Sabha_constituency",
    },
    {
      names: ["Mumbai North West"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mumbai_North_West_Lok_Sabha_constituency",
    },
    {
      names: ["Mumbai North East"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mumbai_North_East_Lok_Sabha_constituency",
    },
    {
      names: ["Mumbai North Central"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mumbai_North_Central_Lok_Sabha_constituency",
    },
    {
      names: ["Mumbai South Central"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mumbai_South_Central_Lok_Sabha_constituency",
    },
    {
      names: ["Mumbai South"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mumbai_South_Lok_Sabha_constituency",
    },
    {
      names: ["Raigad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Raigad_Lok_Sabha_constituency",
    },
    {
      names: ["Maval"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Maval_Lok_Sabha_constituency",
    },
    {
      names: ["Pune"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pune_Lok_Sabha_constituency",
    },
    {
      names: ["Baramati"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Baramati_Lok_Sabha_constituency",
    },
    {
      names: ["Shirur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shirur_Lok_Sabha_constituency",
    },
    {
      names: ["Ahmednagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ahmednagar_Lok_Sabha_constituency",
    },
    {
      names: ["Shirdi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shirdi_Lok_Sabha_constituency",
    },
    {
      names: ["Beed"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Beed_Lok_Sabha_constituency",
    },
    {
      names: ["Osmanabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Osmanabad_Lok_Sabha_constituency",
    },
    {
      names: ["Latur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Latur_Lok_Sabha_constituency",
    },
    {
      names: ["Solapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Solapur_Lok_Sabha_constituency",
    },
    {
      names: ["Madha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Madha_Lok_Sabha_constituency",
    },
    {
      names: ["Sangli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sangli_Lok_Sabha_constituency",
    },
    {
      names: ["Satara"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Satara_Lok_Sabha_constituency",
    },
    {
      names: ["Ratnagiri–Sindhudurg"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ratnagiri%E2%80%93Sindhudurg_Lok_Sabha_constituency",
    },
    {
      names: ["Kolhapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kolhapur_Lok_Sabha_constituency",
    },
    {
      names: ["Hatkanangle"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hatkanangle_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

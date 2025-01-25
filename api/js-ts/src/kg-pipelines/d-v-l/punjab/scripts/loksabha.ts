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
    name: "punjab",
    name_id: "in-sut-punjab",
    vehicle_code: "PB",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Gurdaspur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gurdaspur_Lok_Sabha_constituency",
    },
    {
      names: ["Amritsar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Amritsar_Lok_Sabha_constituency",
    },
    {
      names: ["Khadoor Sahib"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khadoor_Sahib_Lok_Sabha_constituency",
    },
    {
      names: ["Jalandhar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jalandhar_Lok_Sabha_constituency",
    },
    {
      names: ["Hoshiarpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hoshiarpur_Lok_Sabha_constituency",
    },
    {
      names: ["Anandpur Sahib"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Anandpur_Sahib_Lok_Sabha_constituency",
    },
    {
      names: ["Ludhiana"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ludhiana_Lok_Sabha_constituency",
    },
    {
      names: ["Fatehgarh Sahib"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Fatehgarh_Sahib_Lok_Sabha_constituency",
    },
    {
      names: ["Faridkot"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Faridkot_Lok_Sabha_constituency",
    },
    {
      names: ["Firozpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Firozpur_Lok_Sabha_constituency",
    },
    {
      names: ["Bathinda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bathinda_Lok_Sabha_constituency",
    },
    {
      names: ["Sangrur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sangrur_Lok_Sabha_constituency",
    },
    {
      names: ["Patiala"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Patiala_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

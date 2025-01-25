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
    name: "telangana",
    name_id: "in-sut-telangana",
    vehicle_code: "TG",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Adilabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Adilabad_Lok_Sabha_constituency",
    },
    {
      names: ["Peddapalle"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Peddapalli_Lok_Sabha_constituency",
    },
    {
      names: ["Karimnagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Karimnagar_Lok_Sabha_constituency",
    },
    {
      names: ["Nizamabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nizamabad_Lok_Sabha_constituency",
    },
    {
      names: ["Zahirabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Zahirabad_Lok_Sabha_constituency",
    },
    {
      names: ["Medak"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Medak_Lok_Sabha_constituency",
    },
    {
      names: ["Malkajgiri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Malkajgiri_Lok_Sabha_constituency",
    },
    {
      names: ["Secunderabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Secunderabad_Lok_Sabha_constituency",
    },
    {
      names: ["Hyderabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hyderabad_Lok_Sabha_constituency",
    },
    {
      names: ["Chevella"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chevella_Lok_Sabha_constituency",
    },
    {
      names: ["Mahbubnagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mahabubnagar_Lok_Sabha_constituency",
    },
    {
      names: ["Nagarkurnool"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nagarkurnool_Lok_Sabha_constituency",
    },
    {
      names: ["Nalgonda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nalgonda_Lok_Sabha_constituency",
    },
    {
      names: ["Bhongir"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhongir_Lok_Sabha_constituency",
    },
    {
      names: ["Warangal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Warangal_Lok_Sabha_constituency",
    },
    {
      names: ["Mahabubabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mahabubabad_Lok_Sabha_constituency",
    },
    {
      names: ["Khammam"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khammam_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

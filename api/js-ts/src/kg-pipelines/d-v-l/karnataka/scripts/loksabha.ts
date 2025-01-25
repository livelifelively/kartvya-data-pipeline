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
    name: "karnataka",
    name_id: "in-sut-karnataka",
    vehicle_code: "KA",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Chikkodi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chikkodi_Lok_Sabha_constituency",
    },
    {
      names: ["Belgaum"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Belgaum_Lok_Sabha_constituency",
    },
    {
      names: ["Bagalkot"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bagalkot_Lok_Sabha_constituency",
    },
    {
      names: ["Bijapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bijapur_Lok_Sabha_constituency",
    },
    {
      names: ["Gulbarga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gulbarga_Lok_Sabha_constituency",
    },
    {
      names: ["Raichur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Raichur_Lok_Sabha_constituency",
    },
    {
      names: ["Bidar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bidar_Lok_Sabha_constituency",
    },
    {
      names: ["Koppal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Koppal_Lok_Sabha_constituency",
    },
    {
      names: ["Bellary"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bellary_Lok_Sabha_constituency",
    },
    {
      names: ["Haveri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Haveri_Lok_Sabha_constituency",
    },
    {
      names: ["Dharwad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dharwad_Lok_Sabha_constituency",
    },
    {
      names: ["Uttara Kannada"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Uttara_Kannada_Lok_Sabha_constituency",
    },
    {
      names: ["Davanagere"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Davanagere_Lok_Sabha_constituency",
    },
    {
      names: ["Shimoga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shimoga_Lok_Sabha_constituency",
    },
    {
      names: ["Udupi Chikmagalur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Udupi_Chikmagalur_Lok_Sabha_constituency",
    },
    {
      names: ["Hassan"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hassan_Lok_Sabha_constituency",
    },
    {
      names: ["Dakshina Kannada"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dakshina_Kannada_Lok_Sabha_constituency",
    },
    {
      names: ["Chitradurga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chitradurga_Lok_Sabha_constituency",
    },
    {
      names: ["Tumkur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tumkur_Lok_Sabha_constituency",
    },
    {
      names: ["Mandya"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mandya_Lok_Sabha_constituency",
    },
    {
      names: ["Mysore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mysore_Lok_Sabha_constituency",
    },
    {
      names: ["Chamarajanagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chamarajanagar_Lok_Sabha_constituency",
    },
    {
      names: ["Bangalore Rural"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bangalore_Rural_Lok_Sabha_constituency",
    },
    {
      names: ["Bangalore North"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bangalore_North_Lok_Sabha_constituency",
    },
    {
      names: ["Bangalore Central"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bangalore_Central_Lok_Sabha_constituency",
    },
    {
      names: ["Bangalore South"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bangalore_South_Lok_Sabha_constituency",
    },
    {
      names: ["Chikballapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chikballapur_Lok_Sabha_constituency",
    },
    {
      names: ["Kolar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kolar_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

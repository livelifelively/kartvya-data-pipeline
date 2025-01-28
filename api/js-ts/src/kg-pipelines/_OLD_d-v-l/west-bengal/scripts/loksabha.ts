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
    name: "west bengal",
    name_id: "in-sut-west-bengal",
    vehicle_code: "WB",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Cooch Behar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Cooch_Behar_Lok_Sabha_constituency",
    },
    {
      names: ["Alipurduars"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Alipurduars_Lok_Sabha_constituency",
    },
    {
      names: ["Jalpaiguri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jalpaiguri_Lok_Sabha_constituency",
    },
    {
      names: ["Darjeeling"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Darjeeling_Lok_Sabha_constituency",
    },
    {
      names: ["Raiganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Raiganj_Lok_Sabha_constituency",
    },
    {
      names: ["Balurghat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Balurghat_Lok_Sabha_constituency",
    },
    {
      names: ["Maldaha Uttar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Maldaha_Uttar_Lok_Sabha_constituency",
    },
    {
      names: ["Maldaha Dakshin"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Maldaha_Dakshin_Lok_Sabha_constituency",
    },
    {
      names: ["Jangipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jangipur_Lok_Sabha_constituency",
    },
    {
      names: ["Baharampur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Baharampur_Lok_Sabha_constituency",
    },
    {
      names: ["Murshidabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Murshidabad_Lok_Sabha_constituency",
    },
    {
      names: ["Krishnanagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Krishnanagar_Lok_Sabha_constituency",
    },
    {
      names: ["Ranaghat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ranaghat_Lok_Sabha_constituency",
    },
    {
      names: ["Bangaon"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bangaon_Lok_Sabha_constituency",
    },
    {
      names: ["Barrackpore"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Barrackpore_Lok_Sabha_constituency",
    },
    {
      names: ["Dum Dum"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dum_Dum_Lok_Sabha_constituency",
    },
    {
      names: ["Barasat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Barasat_Lok_Sabha_constituency",
    },
    {
      names: ["Basirhat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Basirhat_Lok_Sabha_constituency",
    },
    {
      names: ["Jaynagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jaynagar_Lok_Sabha_constituency",
    },
    {
      names: ["Mathurapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mathurapur_Lok_Sabha_constituency",
    },
    {
      names: ["Diamond Harbour"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Diamond_Harbour_Lok_Sabha_constituency",
    },
    {
      names: ["Jadavpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jadavpur_Lok_Sabha_constituency",
    },
    {
      names: ["Kolkata Dakshin"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kolkata_Dakshin_Lok_Sabha_constituency",
    },
    {
      names: ["Kolkata Uttar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kolkata_Uttar_Lok_Sabha_constituency",
    },
    {
      names: ["Howrah"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Howrah_Lok_Sabha_constituency",
    },
    {
      names: ["Uluberia"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Uluberia_Lok_Sabha_constituency",
    },
    {
      names: ["Srerampur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Serampore_Lok_Sabha_constituency",
    },
    {
      names: ["Hooghly"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hooghly_Lok_Sabha_constituency",
    },
    {
      names: ["Arambagh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Arambagh_Lok_Sabha_constituency",
    },
    {
      names: ["Tamluk"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Tamluk_Lok_Sabha_constituency",
    },
    {
      names: ["Kanthi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kanthi_Lok_Sabha_constituency",
    },
    {
      names: ["Ghatal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ghatal_Lok_Sabha_constituency",
    },
    {
      names: ["Jhargram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jhargram_Lok_Sabha_constituency",
    },
    {
      names: ["Medinipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Medinipur_Lok_Sabha_constituency",
    },
    {
      names: ["Purulia"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Purulia_Lok_Sabha_constituency",
    },
    {
      names: ["Bankura"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bankura_Lok_Sabha_constituency",
    },
    {
      names: ["Bishnupur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bishnupur_Lok_Sabha_constituency",
    },
    {
      names: ["Bardhaman Purba"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bardhaman_Purba_Lok_Sabha_constituency",
    },
    {
      names: ["Bardhaman–Durgapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bardhaman%E2%80%93Durgapur_Lok_Sabha_constituency",
    },
    {
      names: ["Asansol"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Asansol_Lok_Sabha_constituency",
    },
    {
      names: ["Bolpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bolpur_Lok_Sabha_constituency",
    },
    {
      names: ["Birbhum"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Birbhum_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

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
    name: "bihar",
    name_id: "in-sut-bihar",
    vehicle_code: "BR",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Valmiki Nagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Valmiki_Nagar_Lok_Sabha_constituency",
    },
    {
      names: ["Paschim Champaran"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Paschim_Champaran_Lok_Sabha_constituency",
    },
    {
      names: ["Purvi Champaran"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Purvi_Champaran_Lok_Sabha_constituency",
    },
    {
      names: ["Sheohar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sheohar_Lok_Sabha_constituency",
    },
    {
      names: ["Sitamarhi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sitamarhi_Lok_Sabha_constituency",
    },
    {
      names: ["Madhubani"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Madhubani_Lok_Sabha_constituency",
    },
    {
      names: ["Jhanjharpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jhanjharpur_Lok_Sabha_constituency",
    },
    {
      names: ["Supaul"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Supaul_Lok_Sabha_constituency",
    },
    {
      names: ["Araria"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Araria_Lok_Sabha_constituency",
    },
    {
      names: ["Kishanganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kishanganj_Lok_Sabha_constituency",
    },
    {
      names: ["Katihar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Katihar_Lok_Sabha_constituency",
    },
    {
      names: ["Purnia"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Purnia_Lok_Sabha_constituency",
    },
    {
      names: ["Madhepura"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Madhepura_Lok_Sabha_constituency",
    },
    {
      names: ["Darbhanga"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Darbhanga_Lok_Sabha_constituency",
    },
    {
      names: ["Muzaffarpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Muzaffarpur_Lok_Sabha_constituency",
    },
    {
      names: ["Vaishali"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Vaishali_Lok_Sabha_constituency",
    },
    {
      names: ["Gopalganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gopalganj_Lok_Sabha_constituency",
    },
    {
      names: ["Siwan"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Siwan_Lok_Sabha_constituency",
    },
    {
      names: ["Maharajganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Maharajganj,_Bihar_Lok_Sabha_constituency",
    },
    {
      names: ["Saran"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Saran_Lok_Sabha_constituency",
    },
    {
      names: ["Hajipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hajipur_Lok_Sabha_constituency",
    },
    {
      names: ["Ujiarpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ujiarpur_Lok_Sabha_constituency",
    },
    {
      names: ["Samastipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Samastipur_Lok_Sabha_constituency",
    },
    {
      names: ["Begusarai"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Begusarai_Lok_Sabha_constituency",
    },
    {
      names: ["Khagaria"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Khagaria_Lok_Sabha_constituency",
    },
    {
      names: ["Bhagalpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhagalpur_Lok_Sabha_constituency",
    },
    {
      names: ["Banka"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Banka_Lok_Sabha_constituency",
    },
    {
      names: ["Munger"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Munger_Lok_Sabha_constituency",
    },
    {
      names: ["Nalanda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nalanda_Lok_Sabha_constituency",
    },
    {
      names: ["Patna Sahib"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Patna_Sahib_Lok_Sabha_constituency",
    },
    {
      names: ["Pataliputra"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pataliputra_Lok_Sabha_constituency",
    },
    {
      names: ["Arrah"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Arrah_Lok_Sabha_constituency",
    },
    {
      names: ["Buxar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Buxar_Lok_Sabha_constituency",
    },
    {
      names: ["Sasaram"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sasaram_Lok_Sabha_constituency",
    },
    {
      names: ["Karakat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Karakat_Lok_Sabha_constituency",
    },
    {
      names: ["Jahanabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jahanabad_Lok_Sabha_constituency",
    },
    {
      names: ["Aurangabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Aurangabad,_Bihar_Lok_Sabha_constituency",
    },
    {
      names: ["Gaya"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gaya_Lok_Sabha_constituency",
    },
    {
      names: ["Nawada"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nawada_Lok_Sabha_constituency",
    },
    {
      names: ["Jamui"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jamui_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

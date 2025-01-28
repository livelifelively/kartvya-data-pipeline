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
    name: "uttar pradesh",
    name_id: "in-sut-uttar-pradesh",
    vehicle_code: "UP",
  };

  const loksabhaConstituenciesList = [
    {
      names: ["Saharanpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Saharanpur_Lok_Sabha_constituency",
    },
    {
      names: ["Kairana"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kairana_Lok_Sabha_constituency",
    },
    {
      names: ["Muzaffarnagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Muzaffarnagar_Lok_Sabha_constituency",
    },
    {
      names: ["Bijnor"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bijnor_Lok_Sabha_constituency",
    },
    {
      names: ["Nagina"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Nagina_Lok_Sabha_constituency",
    },
    {
      names: ["Moradabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Moradabad_Lok_Sabha_constituency",
    },
    {
      names: ["Rampur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Rampur_Lok_Sabha_constituency",
    },
    {
      names: ["Sambhal"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sambhal_Lok_Sabha_constituency",
    },
    {
      names: ["Amroha"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Amroha_Lok_Sabha_constituency",
    },
    {
      names: ["Meerut"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Meerut_Lok_Sabha_constituency",
    },
    {
      names: ["Baghpat"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Baghpat_Lok_Sabha_constituency",
    },
    {
      names: ["Ghaziabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ghaziabad_Lok_Sabha_constituency",
    },
    {
      names: ["Gautam Buddha Nagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gautam_Buddha_Nagar_Lok_Sabha_constituency",
    },
    {
      names: ["Bulandshahr"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bulandshahr_Lok_Sabha_constituency",
    },
    {
      names: ["Aligarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Aligarh_Lok_Sabha_constituency",
    },
    {
      names: ["Hathras"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hathras_Lok_Sabha_constituency",
    },
    {
      names: ["Mathura"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mathura_Lok_Sabha_constituency",
    },
    {
      names: ["Agra"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Agra_Lok_Sabha_constituency",
    },
    {
      names: ["Fatehpur Sikri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Fatehpur_Sikri_Lok_Sabha_constituency",
    },
    {
      names: ["Firozabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Firozabad_Lok_Sabha_constituency",
    },
    {
      names: ["Mainpuri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mainpuri_Lok_Sabha_constituency",
    },
    {
      names: ["Etah"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Etah_Lok_Sabha_constituency",
    },
    {
      names: ["Badaun"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Badaun_Lok_Sabha_constituency",
    },
    {
      names: ["Aonla"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Aonla_Lok_Sabha_constituency",
    },
    {
      names: ["Bareilly"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bareilly_Lok_Sabha_constituency",
    },
    {
      names: ["Pilibhit"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pilibhit_Lok_Sabha_constituency",
    },
    {
      names: ["Shahjahanpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shahjahanpur_Lok_Sabha_constituency",
    },
    {
      names: ["Kheri"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kheri_Lok_Sabha_constituency",
    },
    {
      names: ["Dhaurahra"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Dhaurahra_Lok_Sabha_constituency",
    },
    {
      names: ["Sitapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sitapur_Lok_Sabha_constituency",
    },
    {
      names: ["Hardoi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hardoi_Lok_Sabha_constituency",
    },
    {
      names: ["Misrikh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Misrikh_Lok_Sabha_constituency",
    },
    {
      names: ["Unnao"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Unnao_Lok_Sabha_constituency",
    },
    {
      names: ["Mohanlalganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mohanlalganj_Lok_Sabha_constituency",
    },
    {
      names: ["Lucknow"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Lucknow_Lok_Sabha_constituency",
    },
    {
      names: ["Rae Bareli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Raebareli_Lok_Sabha_constituency",
    },
    {
      names: ["Amethi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Amethi_Lok_Sabha_constituency",
    },
    {
      names: ["Sultanpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sultanpur_Lok_Sabha_constituency",
    },
    {
      names: ["Pratapgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Pratapgarh_Lok_Sabha_constituency",
    },
    {
      names: ["Farrukhabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Farrukhabad_Lok_Sabha_constituency",
    },
    {
      names: ["Etawah"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Etawah_Lok_Sabha_constituency",
    },
    {
      names: ["Kannauj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kannauj_Lok_Sabha_constituency",
    },
    {
      names: ["Kanpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kanpur_Lok_Sabha_constituency",
    },
    {
      names: ["Akbarpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Akbarpur_Lok_Sabha_constituency",
    },
    {
      names: ["Jalaun"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jalaun_Lok_Sabha_constituency",
    },
    {
      names: ["Jhansi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jhansi_Lok_Sabha_constituency",
    },
    {
      names: ["Hamirpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Hamirpur,_Uttar_Pradesh_Lok_Sabha_constituency",
    },
    {
      names: ["Banda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Banda_Lok_Sabha_constituency",
    },
    {
      names: ["Fatehpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Fatehpur_Lok_Sabha_constituency",
    },
    {
      names: ["Kaushambi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kaushambi_Lok_Sabha_constituency",
    },
    {
      names: ["Phulpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Phulpur_Lok_Sabha_constituency",
    },
    {
      names: ["Allahabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Allahabad_Lok_Sabha_constituency",
    },
    {
      names: ["Barabanki"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Barabanki_Lok_Sabha_constituency",
    },
    {
      names: ["Faizabad"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Faizabad_Lok_Sabha_constituency",
    },
    {
      names: ["Ambedkar Nagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ambedkar_Nagar_Lok_Sabha_constituency",
    },
    {
      names: ["Bahraich"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bahraich_Lok_Sabha_constituency",
    },
    {
      names: ["Kaiserganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kaiserganj_Lok_Sabha_constituency",
    },
    {
      names: ["Shrawasti"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Shravasti_Lok_Sabha_constituency",
    },
    {
      names: ["Gonda"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gonda_Lok_Sabha_constituency",
    },
    {
      names: ["Domariyaganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Domariyaganj_Lok_Sabha_constituency",
    },
    {
      names: ["Basti"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Basti_Lok_Sabha_constituency",
    },
    {
      names: ["Sant Kabir Nagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Sant_Kabir_Nagar_Lok_Sabha_constituency",
    },
    {
      names: ["Maharajganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Maharajganj,_Uttar_Pradesh_Lok_Sabha_constituency",
    },
    {
      names: ["Gorakhpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Gorakhpur_Lok_Sabha_constituency",
    },
    {
      names: ["Kushi Nagar"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Kushi_Nagar_Lok_Sabha_constituency",
    },
    {
      names: ["Deoria"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Deoria_Lok_Sabha_constituency",
    },
    {
      names: ["Bansgaon"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bansgaon_Lok_Sabha_constituency",
    },
    {
      names: ["Lalganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Lalganj_Lok_Sabha_constituency",
    },
    {
      names: ["Azamgarh"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Azamgarh_Lok_Sabha_constituency",
    },
    {
      names: ["Ghosi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ghosi_Lok_Sabha_constituency",
    },
    {
      names: ["Salempur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Salempur_Lok_Sabha_constituency",
    },
    {
      names: ["Ballia"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ballia_Lok_Sabha_constituency",
    },
    {
      names: ["Jaunpur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Jaunpur_Lok_Sabha_constituency",
    },
    {
      names: ["Machhlishahr"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Machhlishahr_Lok_Sabha_constituency",
    },
    {
      names: ["Ghazipur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Ghazipur_Lok_Sabha_constituency",
    },
    {
      names: ["Chandauli"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Chandauli_Lok_Sabha_constituency",
    },
    {
      names: ["Varanasi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Varanasi_Lok_Sabha_constituency",
    },
    {
      names: ["Bhadohi"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhadohi_Lok_Sabha_constituency",
    },
    {
      names: ["Mirzapur"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Mirzapur_Lok_Sabha_constituency",
    },
    {
      names: ["Robertsganj"],
      wikipedia_page: "https://en.wikipedia.org/wiki/Robertsganj_Lok_Sabha_constituency",
    },
  ];

  const saveToKG = true;

  await loksabhaConstituenciesPipeline(stateUT, loksabhaConstituenciesList, saveToKG);

  return;
})();

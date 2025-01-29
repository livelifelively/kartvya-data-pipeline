import path from "path";
import fs from "fs";

import { PipelineStep, runPipeline } from "../../pipeline/pipeline";

import {
  addVidhansabhaConstituencyDataToKnowledgeGraph,
  checkForDuplicateNameIds,
  fetchVidhansabhaConstituenciesWikiDetails,
  fetchVidhansabhaConstituencyECIGeoFeatures,
  transformVidhansabhaConstituenciesWikipediaData,
  transformVidhansabhaConstituenciesWithECIGeo,
} from "../../pipeline/vidhansabha-pipeline";

import {
  addLoksabhaConstituencyDataToKnowledgeGraph,
  fetchLoksabhaConstituenciesWikiDetails,
  fetchLoksabhaConstituencyECIGeoFeatures,
  transformLoksabhaConstituenciesWikipediaData,
  transformLoksabhaConstituenciesWithECIGeo,
} from "../../pipeline/loksabha-pipeline";

import vidhansabha from "./vidhansabha-seats.json";
import loksabha from "./loksabha-seats.json";
import { keyBy } from "lodash";
import { copyFilesWithStructure } from "../../file-utils/move-certain-files";
import { cleanDirectories } from "../../file-utils/remove-files-folders";

export const copyProgressFromOldDVL = (loksabha: any, vidhansabhaConstituenciesKeyedByNameId: any) => {
  let state: any = {};

  for (state of loksabha) {
    state.vidhansabha_constituencies =
      vidhansabhaConstituenciesKeyedByNameId[state.name_id]?.vidhansabha_constituencies;

    const sourceStateDir = path.join(__dirname, "../_OLD_d-v-l", state.name_id.split("in-sut-")[1]);
    const targetStateDir = path.join(__dirname, state.name_id.split("in-sut-")[1]);

    const sourceLSPipelineLogsPath = path.join(sourceStateDir, "loksabha-constituency-pipeline-logs");
    const targetLSPipelineLogsPath = path.join(targetStateDir, "loksabha-constituency-pipeline-logs");
    const targetProgressStatusLSPipelineLogsPath = path.join(targetLSPipelineLogsPath, "progressStatus.json");

    fs.mkdirSync(targetLSPipelineLogsPath, { recursive: true });

    const progressJSONLoksabha = [
      {
        iteration: 1,
        timeStamp: new Date(),
        steps: [
          {
            step: 0,
            logFile: `src/kg-pipelines/d-v-l/${
              state.name_id.split("in-sut-")[1]
            }/loksabha-constituency-pipeline-logs/1.STEP_0_SUCCESS_Fetch Loksabha_Constituency Wiki Details.log.json`,
            status: "SUCCESS",
          },
        ],
      },
    ];
    copyFilesWithStructure(sourceLSPipelineLogsPath, targetLSPipelineLogsPath, [
      "1.STEP_0_SUCCESS_Fetch Loksabha_Constituency Wiki Details.log.json",
    ]);
    fs.writeFileSync(targetProgressStatusLSPipelineLogsPath, JSON.stringify(progressJSONLoksabha, null, 2));

    if (!state.vidhansabha_constituencies) {
      continue;
    }

    const sourceVSPipelineLogsPath = path.join(sourceStateDir, "vidhansabha-constituency-pipeline-logs");
    const targetVSPipelineLogsPath = path.join(targetStateDir, "vidhansabha-constituency-pipeline-logs");
    const targetProgressStatusVSPipelineLogsPath = path.join(targetVSPipelineLogsPath, "progressStatus.json");

    fs.mkdirSync(targetVSPipelineLogsPath, { recursive: true });

    const progressJSONVidhansabha = [
      {
        iteration: 1,
        timeStamp: new Date(),
        steps: [
          {
            step: 0,
            logFile: `src/kg-pipelines/d-v-l/${
              state.name_id.split("in-sut-")[1]
            }/vidhansabha-constituency-pipeline-logs/1.STEP_0_SUCCESS_Fetch Vidhansabha_Constituency Wiki Details.log.json`,
            status: "SUCCESS",
          },
        ],
      },
    ];
    copyFilesWithStructure(sourceVSPipelineLogsPath, targetVSPipelineLogsPath, [
      "1.STEP_0_SUCCESS_Fetch Vidhansabha_Constituency Wiki Details.log.json",
    ]);
    fs.writeFileSync(targetProgressStatusVSPipelineLogsPath, JSON.stringify(progressJSONVidhansabha, null, 2));
  }
};

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

  const loksabhaConstituenciesProgressDir = path.join(
    __dirname,
    stateUT.name_id.split("in-sut-")[1],
    "loksabha-constituency-pipeline-logs"
  );

  const progressStatusFile = path.join(loksabhaConstituenciesProgressDir, "progressStatus.json");

  try {
    const lastStepOutput = await runPipeline(steps, outputs, loksabhaConstituenciesProgressDir, progressStatusFile);

    // if (saveToKG) return lastStepOutput.savedToKnowledgeGraph;
    // return lastStepOutput.transformedLoksabhaConstituenciesECIGeo;
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

async function vidhansabhaConstituenciesPipeline(
  stateUT: any,
  vidhansabhaConstituenciesList: any,
  saveToKG: boolean = false
) {
  console.log("VIDHANSABHA PROCESSING INITIALIZED: ", stateUT.name);

  const steps: PipelineStep[] = [
    // {
    //   name: "Fetch State Vidhansabha_Constituency",
    //   function: fetchStateVidhansabhaConstituencies,
    //   key: "STATE_VIDHANSABHA_LIST",
    //   input: stateUT,
    // },
    {
      name: "Fetch Vidhansabha_Constituency Wiki Details",
      function: fetchVidhansabhaConstituenciesWikiDetails,
      key: "STATE_VIDHANSABHA_CONSTITUENCY_WIKI_DATA",
      input: null, // Will be set after the first step
    },
    {
      name: "Fetch VidhansabhaConstituency ECI Geo Features",
      function: fetchVidhansabhaConstituencyECIGeoFeatures,
      key: "STATE_VIDHANSABHA_CONSTITUENCY_ECI_GEO_DATA",
      input: stateUT,
    },
    {
      name: "Append Wikipedia Data",
      function: transformVidhansabhaConstituenciesWikipediaData,
      input: null, // Will be set after the fifth step
      key: "APPEND_WIKIPEDIA_DATA_TRANSFORM_STATE_VIDHANSABHA_CONSTITUENCY_DATA",
    },
    {
      name: "FIND AND RESOLVE DUPLICATE NAME IDS",
      function: checkForDuplicateNameIds,
      input: null,
      key: "FIND_AND_RESOLVE_DUPLICATE_NAME_IDS_TRANSFORM_STATE_VIDHANSABHA_CONSTITUENCY_DATA",
    },
    {
      name: "Transform Vidhansabha_Constituency with ECI Geo",
      function: transformVidhansabhaConstituenciesWithECIGeo,
      input: null, // Will be set after the sixth and seventh steps
      key: "APPEND_ECI_DATA_TRANSFORM_STATE_VIDHANSABHA_CONSTITUENCY_DATA",
    },
  ];

  let outputs: Record<string, any> = {
    stateUT,
    vidhansabhaConstituenciesList,
    stateVidhansabhaConstituencies: vidhansabhaConstituenciesList,
    vidhansabhaConstituenciesCount: 0,
    vidhansabhaConstituenciesWikiDetails: [],
    vidhansabhaConstituenciesWikiDetailsFailed: [],
    vidhansabhaConstituencyFeaturesECI: [],
    transformedVidhansabhaConstituenciesWikipedia: [],
    vidhansabhaConstituenciesNotTransformedWikipedia: [],
    transformedVidhansabhaConstituenciesECIGeo: [],
    unmatchedVidhansabhaConstituenciesECIGeo: [],
    savedToKnowledgeGraph: [],
  };

  if (saveToKG) {
    steps.push({
      name: "Save Vidhansabha_Constituency to KnowledgeGraph",
      function: addVidhansabhaConstituencyDataToKnowledgeGraph,
      input: null,
      key: "SAVE_DISTRICT_DATA_TO_KNOWLEDGE_GRAPH",
    });
  }

  const vidhansabhaConstituenciesProgressDir = path.join(
    __dirname,
    stateUT.name_id.split("in-sut-")[1],
    "vidhansabha-constituency-pipeline-logs"
  );

  const progressStatusFile = path.join(vidhansabhaConstituenciesProgressDir, "progressStatus.json");

  try {
    const lastStepOutput = await runPipeline(steps, outputs, vidhansabhaConstituenciesProgressDir, progressStatusFile);

    // if (saveToKG) return lastStepOutput.savedToKnowledgeGraph;
    // // return lastStepOutput.transformedVidhansabhaConstituenciesECIGeo;
  } catch (error) {
    console.error("Error in processing: ", error);
    throw new Error("Error in processing");
  }
}

(async () => {
  const vidhansabhaConstituenciesKeyedByNameId = keyBy(vidhansabha, "name_id");
  let state: any;

  for (let i = 0; i < loksabha.length; i++) {
    state = loksabha[i];
    const saveToKG = true;

    console.log("PROCESSING ", state.name);

    state.vidhansabha_constituencies =
      vidhansabhaConstituenciesKeyedByNameId[state.name_id]?.vidhansabha_constituencies;

    // await loksabhaConstituenciesPipeline(
    //   { name: state.name, name_id: state.name_id, vehicle_code: state.vehicle_code },
    //   state.loksabha_constituencies,
    //   saveToKG
    // );

    if (state.vidhansabha_constituencies) {
      await vidhansabhaConstituenciesPipeline(
        { name: state.name, name_id: state.name_id, vehicle_code: state.vehicle_code },
        state.vidhansabha_constituencies,
        saveToKG
      );
    }
  }

  // cleanDirectories(state.name_id);
  // copyProgressFromOldDVL(loksabha, vidhansabhaConstituenciesKeyedByNameId);
})();

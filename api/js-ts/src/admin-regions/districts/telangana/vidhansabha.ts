import path from "path";
import fs from "fs";
import { keyBy, map, size } from "lodash";
// import { vidhansabhaConstituenciesList } from "../all-states-vidhansabhaConstituencies-list";

import { queryNodeType, createNodeType } from "../../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../../knowledge-graph/generic/generic.utils";
// import { fetchByRelationId, fetchVidhansabhaConstituenciesForState } from "../../../maps/india-osm/states.fetch-geojsons";
// import { processListOfWikipediaPages } from "../extract-vidhansabhaConstituency-page-data";
import { upsert_Name_ } from "../../../knowledge-graph/name/name.update";
import { multiPolygonToDgraphMultiPolygon, polygonToMultiPolygon } from "../../states/andhra-pradesh/scripts/districts";
import { processListOfWikipediaPages } from "../extract-district-page-data";

interface VidhansabhaConstituency {
  names: string[];
  wikipedia_page: string;
  states_union_territories: string;
}

interface StateVidhansabhaConstituencies {
  state: string;
  name_id: string;
  vidhansabha_constituencies: VidhansabhaConstituency[];
}

interface ProgressData {
  message: string;
  data: any;
  error?: any;
  key: string;
  timeStamp?: Date;
}

interface ProgressStep {
  step: number;
  logFile: string;
  status: "SUCCESS" | "FAILURE" | "PARTIAL";
}

interface StateOSMData {
  osm_id: string;
  id: string;
  state_osm_data: OSMData;
}

interface OSMData {
  localname: string;
  admin_level: number;
}

interface OSMDetails {
  id: string;
}

interface GeoJSONFeature {
  type: string;
  properties: {
    stname: string;
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: any[];
  };
}

interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}

interface VidhansabhaConstituencyTransformationWikidata extends VidhansabhaConstituency {
  wikidata_qid: string;
}

interface StateVidhansabhaConstituencyTransformationWikidata {
  state: string;
  name_id: string;
  vidhansabha_constituencies: VidhansabhaConstituencyTransformationWikidata[];
}

interface WikiVidhansabhaConstituencyResult {
  url: string;
  results: {
    wikidata_qid?: string;
    wikipedia_page?: string;
    last_updated_on?: string;
  };
}

interface VidhansabhaConstituencyTransformationWikidata extends VidhansabhaConstituency {
  wikidata_qid: string;
  wikipedia_page: string;
}

interface VidhansabhaConstituencyTransformationOSM extends VidhansabhaConstituencyTransformationWikidata {
  osm_id: string;
  // match_quality: "100%" | "50%";
  localnameMatch: Boolean;
  wikidataMatch: Boolean;
  geo_osm: any;
}

interface VidhansabhaConstituencyTransformationECIGeo extends VidhansabhaConstituencyTransformationOSM {
  geo_soi: any;
}

interface Step {
  name: string;
  // function: (
  //   outputs: Record<string, any>
  // ) => Promise<{ transformedVidhansabhaConstituencies: any[]; status: "SUCCESS" | "FAILURE" | "PARTIAL" }>;
  function: any;
  input: any;
  output?: any;
  status?: "SUCCESS" | "FAILURE" | "PARTIAL";
  key: string;
}

interface ProgressData {
  message: string;
  data: any;
  key: string;
}

interface ProgressStep {
  step: number;
  logFile: string;
  status: "SUCCESS" | "FAILURE" | "PARTIAL";
}

interface ProgressIteration {
  iteration: number;
  lastIteration?: number;
  timeStamp: Date;
  steps: ProgressStep[];
}

const vidhansabhaConstituenciesProgressDir = path.join(__dirname, "vidhansabha-constituency-pipeline-logs");
const progressStatusFile = path.join(vidhansabhaConstituenciesProgressDir, "progressStatus.json");

function initializeDirectories(): void {
  fs.mkdirSync(vidhansabhaConstituenciesProgressDir, { recursive: true });
  // fs.mkdirSync(path.dirname(progressStatusFile), { recursive: true });
  if (!fs.existsSync(progressStatusFile)) {
    fs.writeFileSync(progressStatusFile, JSON.stringify([]));
  }
}

function createNewIteration(): ProgressIteration {
  const progressStatus: ProgressIteration[] = JSON.parse(fs.readFileSync(progressStatusFile, "utf8"));

  return {
    iteration: progressStatus.length + 1,
    timeStamp: new Date(),
    steps: [],
  };
}

function getLastIteration(): ProgressIteration {
  const progressStatus: ProgressIteration[] = JSON.parse(fs.readFileSync(progressStatusFile, "utf8"));

  const lastIterationStatus = progressStatus[progressStatus.length - 1];
  return lastIterationStatus;
}

function logProgress(
  progressData: ProgressData,
  status: "SUCCESS" | "FAILURE" | "PARTIAL",
  iteration: ProgressIteration
): void {
  const progressStatus: ProgressIteration[] = JSON.parse(fs.readFileSync(progressStatusFile, "utf8"));
  const progressDataLogFile = path.join(
    vidhansabhaConstituenciesProgressDir,
    `${iteration.iteration}.${progressData.key}.log.json`
  );

  iteration.steps.push({
    step: iteration.steps.length,
    logFile: progressDataLogFile,
    status,
  });

  let existingLogs: ProgressData;
  if (fs.existsSync(progressDataLogFile)) {
    existingLogs = JSON.parse(fs.readFileSync(progressDataLogFile, "utf8"));
  }

  // replace. in case of array, will append
  existingLogs = { ...progressData, timeStamp: new Date() };
  fs.writeFileSync(progressDataLogFile, JSON.stringify(existingLogs, null, 2));

  const existingIterationIndex = progressStatus.findIndex((iter) => iter.iteration === iteration.iteration);
  if (existingIterationIndex !== -1) {
    progressStatus[existingIterationIndex] = iteration;
  } else {
    progressStatus.push(iteration);
  }

  fs.writeFileSync(progressStatusFile, JSON.stringify(progressStatus, null, 2));

  console.log(
    // progressStatus.map((val) => ({
    //   iteration: val.iteration,
    //   timeStamp: val.timeStamp,
    //   steps: val.steps.map((step) => ({
    //     step: step.step,
    //     logFile: step.logFile,
    //     status: step.status,
    //   })),
    // }))
    JSON.stringify(progressStatus[progressStatus.length - 1], null, 2)
  );
}

async function fetchStateVidhansabhaConstituencies(outputs: Record<string, any>): Promise<{
  stateVidhansabhaConstituencies: StateVidhansabhaConstituencies;
  vidhansabhaConstituenciesCount: number;
  status: "SUCCESS" | "FAILURE" | "PARTIAL";
}> {
  const { stateName } = outputs;

  try {
    const stateVidhansabhaConstituencies = vidhansabhaConstituenciesList.find(
      (val: any) => val.state === stateName
    ) as any;
    stateVidhansabhaConstituencies.vidhansabhaConstituencies =
      stateVidhansabhaConstituencies?.vidhansabhaConstituencies.map((val: any) => ({
        names: [val.name],
        wikipedia_page: val.wikipedia_page,
        states_union_territories: stateVidhansabhaConstituencies.name_id,
      }));

    return {
      stateVidhansabhaConstituencies,
      vidhansabhaConstituenciesCount: stateVidhansabhaConstituencies.vidhansabhaConstituencies.length,
      status: "SUCCESS",
    };
  } catch (e) {
    throw e;
  }
}

async function fetchVidhansabhaConstituenciesWikiDetails(outputs: Record<string, any>): Promise<any> {
  const { stateVidhansabhaConstituencies } = outputs;

  let status: "SUCCESS" | "PARTIAL" | "FAILURE" = "SUCCESS";
  try {
    const urls = map(stateVidhansabhaConstituencies.vidhansabhaConstituencies, (val) => val.wikipedia_page);
    const { success, failure } = await processListOfWikipediaPages(urls);

    if (failure.length) status = "PARTIAL";

    return {
      vidhansabhaConstituenciesWikiDetails: success,
      vidhansabhaConstituenciesWikiDetailsFailed: failure,
      status,
    };
  } catch (e) {
    throw e;
  }
}

async function fetchVidhansabhaConstituencyECIGeoFeatures(outputs: Record<string, any>): Promise<any> {
  const { stateName } = outputs;
  const vidhansabhaConstituenciesGeoECI = require("../d.geo.json");

  try {
    const vidhansabhaConstituencyFeaturesECI = vidhansabhaConstituenciesGeoECI?.filter(
      (dist: any) => dist.properties.stname.toLowerCase() === stateName.toLowerCase()
    );

    if (vidhansabhaConstituencyFeaturesECI?.length) {
      return { vidhansabhaConstituencyFeaturesECI, status: "SUCCESS" };
    } else {
      return { status: "FAILURE" };
    }
  } catch (e) {
    throw e;
  }
}

async function transformVidhansabhaConstituenciesWikipediaData(outputs: Record<string, any>): Promise<any> {
  const { vidhansabhaConstituenciesWikiDetails, stateVidhansabhaConstituencies } = outputs;

  const keyedVidhansabhaConstituencies: Record<string, VidhansabhaConstituency> = keyBy(
    stateVidhansabhaConstituencies.vidhansabhaConstituencies,
    "wikipedia_page"
  );
  const transformedVidhansabhaConstituenciesWikipedia: VidhansabhaConstituencyTransformationWikidata[] = [];
  const missingUrls: string[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  vidhansabhaConstituenciesWikiDetails.forEach((wikiVidhansabhaConstituency: WikiVidhansabhaConstituencyResult) => {
    if (!keyedVidhansabhaConstituencies[wikiVidhansabhaConstituency.url]) {
      missingUrls.push(wikiVidhansabhaConstituency.url);
      status = "PARTIAL";
    } else {
      if (wikiVidhansabhaConstituency.results.wikidata_qid) {
        transformedVidhansabhaConstituenciesWikipedia.push({
          ...keyedVidhansabhaConstituencies[wikiVidhansabhaConstituency.url],
          wikidata_qid: wikiVidhansabhaConstituency.results.wikidata_qid,
        });

        delete keyedVidhansabhaConstituencies[wikiVidhansabhaConstituency.url];
      }
    }
  });

  if (size(keyedVidhansabhaConstituencies)) {
    status = "PARTIAL";
  }

  return {
    transformedVidhansabhaConstituenciesWikipedia,
    vidhansabhaConstituenciesNotTransformedWikipedia: Object.values(keyedVidhansabhaConstituencies),
    status,
  };
}

async function transformVidhansabhaConstituenciesWithECIGeo(outputs: Record<string, any>): Promise<any> {
  const { vidhansabhaConstituencyFeaturesECI, allMatchedVidhansabhaConstituenciesOSMWiki } = outputs;

  const transformedVidhansabhaConstituenciesECIGeo: VidhansabhaConstituencyTransformationECIGeo[] = [];
  const unmatchedVidhansabhaConstituencies: VidhansabhaConstituencyTransformationOSM[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  // // Filter vidhansabhaConstituenciesGeoECI for the given state
  // const stateVidhansabhaConstituenciesGeoECI: GeoJSONFeature[] = vidhansabhaConstituenciesGeoECI.filter(
  //   (feature: GeoJSONFeature) => feature.properties.stname.toLowerCase() === stateName.toLowerCase()
  // );

  allMatchedVidhansabhaConstituenciesOSMWiki.forEach(
    (vidhansabhaConstituency: VidhansabhaConstituencyTransformationOSM) => {
      const matchedGeoDetail = vidhansabhaConstituencyFeaturesECI.find((geoDetail: GeoJSONFeature) => {
        const lowerCaseVidhansabhaConstituencyNames = vidhansabhaConstituency.names.map((n) => n.toLowerCase());
        return lowerCaseVidhansabhaConstituencyNames.includes(geoDetail.properties.dtname.toLowerCase());
      });

      if (matchedGeoDetail) {
        transformedVidhansabhaConstituenciesECIGeo.push({
          ...vidhansabhaConstituency,
          geo_soi: matchedGeoDetail,
        });
      } else {
        unmatchedVidhansabhaConstituencies.push(vidhansabhaConstituency);
        status = "PARTIAL";
      }
    }
  );

  return {
    transformedVidhansabhaConstituenciesECIGeo,
    unmatchedVidhansabhaConstituenciesECIGeo: unmatchedVidhansabhaConstituencies,
    status,
  };
}

async function addVidhansabhaConstituencyDataToKnowledgeGraph(outputs: Record<string, any>) {
  const { transformedVidhansabhaConstituenciesECIGeo } = outputs;

  let savedToKnowledgeGraph: any = [];
  for (let td of transformedVidhansabhaConstituenciesECIGeo) {
    const graphQLClient = await createGraphQLClient();

    let toSaveVidhansabhaConstituency = {
      name_id: td.name_id,
      names: td.names.map((val: any) => {
        return {
          name: val,
        };
      }),
      states_union_territories: [{ name_id: td.states_union_territories }],
      wikipedia_page: td.wikipedia_page,
      wikidata_qid: td.wikidata_qid,
      osm_id: td.osm_id,
      node_created_on: new Date(),
    };

    const vidhansabhaConstituencyMapOSM = polygonToMultiPolygon(td.geo_osm);
    const vidhansabhaConstituencyMapECI = polygonToMultiPolygon(td.geo_soi);

    let geo_eci = {
      area: multiPolygonToDgraphMultiPolygon(vidhansabhaConstituencyMapECI.geometry.coordinates),
      category: "Region",
      source_name: "Election Commission Of India",
      //   source_url: `https://results.eci.gov.in/PcResultGenJune2024/pc/${lc.geo.properties.ST_CODE}.js`,
      source_data: `${JSON.stringify(td.geo_soi)}`,
    };

    let nameIds: any = [];
    for (let n of toSaveVidhansabhaConstituency.names) {
      const nameId = await upsert_Name_(n.name);
      nameIds.push({ id: nameId });
    }

    const vidhansabhaConstituencyId = await createNodeType(
      "_Indian_Vidhansabha_Constituency_",
      graphQLClient,
      toSaveVidhansabhaConstituency
    );

    const geoECIId = await createNodeType("_Geo_", graphQLClient, geo_eci);

    let toSaveVidhansabhaConstituencyRegion = {
      self: { name_id: toSaveVidhansabhaConstituency.name_id },
      geo_boundary: [
        {
          id: geoECIId,
        },
      ],
      node_created_on: new Date(),
    };

    // save vidhansabhaConstituency region
    const vidhansabhaConstituencyRegionId = await createNodeType(
      "_Indian_Vidhansabha_Constituency_Region_",
      graphQLClient,
      toSaveVidhansabhaConstituencyRegion
    );

    savedToKnowledgeGraph.push({
      names: nameIds,
      vidhansabhaConstituency: {
        vidhansabhaConstituencyId,
        toSaveVidhansabhaConstituency,
      },
      vidhansabhaConstituencyRegion: {
        vidhansabhaConstituencyRegionId,
        toSaveVidhansabhaConstituencyRegion,
      },
      geo: {
        geo_eci: {
          geo_eci,
          geoECIId,
        },
      },
    });
  }

  return { savedToKnowledgeGraph, status: "SUCCESS" };
}

async function orchestrationFunction(stateName: string, steps: Step[]): Promise<void> {
  // single state object. one source of truth in memory
  let outputs: Record<string, any> = {
    stateName,
    stateVidhansabhaConstituencies: {},
    vidhansabhaConstituenciesCount: 0,
    vidhansabhaConstituenciesWikiDetails: [],
    vidhansabhaConstituenciesWikiDetailsFailed: [],
    vidhansabhaConstituencyFeaturesECI: [],
    transformedVidhansabhaConstituenciesWikipedia: [],
    vidhansabhaConstituenciesNotTransformedWikipedia: [],
    transformedVidhansabhaConstituenciesECIGeo: [],
    unmatchedVidhansabhaConstituenciesECIGeo: [],
  };

  const previousIteration = getLastIteration();
  const currentIteration = createNewIteration();

  // if the previous iteration stopped before all steps being successful
  // copy data and status to current iteration. so that can start from lastSuccessfulStep + 1
  if (
    previousIteration &&
    (steps.length !== previousIteration.steps.length || previousIteration.steps[steps.length - 1].status !== "SUCCESS")
  ) {
    for (let s in previousIteration.steps) {
      if (previousIteration.steps[s].status === "SUCCESS") {
        currentIteration.steps[s] = { ...previousIteration.steps[s] };
        const stepOutput = JSON.parse(fs.readFileSync(previousIteration.steps[s].logFile, "utf8"));
        outputs = { ...outputs, ...stepOutput.data };
      } else {
        break;
      }
    }
  }

  // execute every step on by one
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];

    // Check if the step has already been completed successfully in same iteration
    const progressStep = currentIteration.steps.find((s) => s.step === i);
    if (progressStep && progressStep.status === "SUCCESS") {
      console.log(`Step ${i} (${step.name}) already completed successfully.`);
      outputs = { ...outputs, ...step.output };
      continue;
    }

    try {
      console.log(`Executing step ${i} (${step.name})...`);
      const { status, ...stepOutputs } = await step.function(outputs);

      step.status = status;
      step.output = stepOutputs;
      outputs = { ...outputs, ...stepOutputs };

      if (step.status !== "SUCCESS") {
        throw new Error();
      }

      logProgress(
        {
          message: `Step ${i} (${step.name}) completed successfully.`,
          data: step.output,
          key: `STEP_${i}_${step.status}_${step.name}`,
        },
        "SUCCESS",
        currentIteration
      );
    } catch (error: any) {
      step.status = step.status || "FAILURE";
      logProgress(
        {
          message: `Step ${i} (${step.name}) failed.`,
          data: { ...step.output },
          error: step.status !== "PARTIAL" ? { error: error.message } : {},
          key: `STEP_${i}_${step.status}_${step.name}`,
        },
        step.status,
        currentIteration
      );

      console.error(`Step ${i} (${step.name}) failed. Manual intervention required.`);
      throw new Error(`Step ${i} (${step.name}) failed. Manual intervention required.`);
    }

    // Update the progress iteration with the current step status
    // iteration.steps.push({
    //   step: i,
    //   logFile: `step_${i}_${step.name}.log.json`,
    //   status: step.status,
    // });

    // Save the updated iteration status to the progress status file
    const progressStatus: ProgressIteration[] = JSON.parse(fs.readFileSync(progressStatusFile, "utf8"));
    const existingIterationIndex = progressStatus.findIndex((iter) => iter.iteration === currentIteration.iteration);
    if (existingIterationIndex !== -1) {
      progressStatus[existingIterationIndex] = currentIteration;
    } else {
      progressStatus.push(currentIteration);
    }
    fs.writeFileSync(progressStatusFile, JSON.stringify(progressStatus, null, 2));
  }
}

(async () => {
  initializeDirectories();
  const stateName = "andaman and nicobar islands";
  console.log("VIDHANSABHA PROCESSING INITIALIZED: ", stateName);

  const steps: Step[] = [
    {
      name: "Fetch State Vidhansabha_Constituency",
      function: fetchStateVidhansabhaConstituencies,
      key: "STATE_VIDHANSABHA_LIST",
      input: stateName,
    },
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
      input: stateName,
    },
    {
      name: "Append Wikipedia Data",
      function: transformVidhansabhaConstituenciesWikipediaData,
      input: null, // Will be set after the fifth step
      key: "APPEND_WIKIPEDIA_DATA_TRANSFORM_STATE_VIDHANSABHA_CONSTITUENCY_DATA",
    },
    {
      name: "Transform Vidhansabha_Constituency with ECI Geo",
      function: transformVidhansabhaConstituenciesWithECIGeo,
      input: null, // Will be set after the sixth and seventh steps
      key: "APPEND_ECI_DATA_TRANSFORM_STATE_VIDHANSABHA_CONSTITUENCY_DATA",
    },
    {
      name: "Save Vidhansabha_Constituency to KnowledgeGraph",
      function: addVidhansabhaConstituencyDataToKnowledgeGraph,
      input: null,
      key: "SAVE_DISTRICT_DATA_TO_KNOWLEDGE_GRAPH",
    },
  ];

  try {
    await orchestrationFunction(stateName, steps);
  } catch (error) {
    console.error("Error in processing: ", error);
  }
})();

import path from "path";
import fs from "fs";
import { keyBy, map, size } from "lodash";
// import { loksabhaConstituenciesList } from "../all-states-loksabhaConstituencies-list";

import { queryNodeType, createNodeType } from "../../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../../knowledge-graph/generic/generic.utils";
// import { fetchByRelationId, fetchLoksabhaConstituenciesForState } from "../../../maps/india-osm/states.fetch-geojsons";
// import { processListOfWikipediaPages } from "../extract-loksabhaConstituency-page-data";
import { upsert_Name_ } from "../../../knowledge-graph/name/name.update";
import { multiPolygonToDgraphMultiPolygon, polygonToMultiPolygon } from "../../states/andhra-pradesh/scripts/districts";
import { processListOfWikipediaPages } from "../extract-district-page-data";

interface LoksabhaConstituency {
  names: string[];
  wikipedia_page: string;
  states_union_territories: string;
}

interface StateLoksabhaConstituencies {
  state: string;
  name_id: string;
  loksabha_constituencies: LoksabhaConstituency[];
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

interface LoksabhaConstituencyTransformationWikidata extends LoksabhaConstituency {
  wikidata_qid: string;
}

interface StateLoksabhaConstituencyTransformationWikidata {
  state: string;
  name_id: string;
  loksabha_constituencies: LoksabhaConstituencyTransformationWikidata[];
}

interface WikiLoksabhaConstituencyResult {
  url: string;
  results: {
    wikidata_qid?: string;
    wikipedia_page?: string;
    last_updated_on?: string;
  };
}

interface LoksabhaConstituencyTransformationWikidata extends LoksabhaConstituency {
  wikidata_qid: string;
  wikipedia_page: string;
}

interface LoksabhaConstituencyTransformationOSM extends LoksabhaConstituencyTransformationWikidata {
  osm_id: string;
  // match_quality: "100%" | "50%";
  localnameMatch: Boolean;
  wikidataMatch: Boolean;
  geo_osm: any;
}

interface LoksabhaConstituencyTransformationECIGeo extends LoksabhaConstituencyTransformationOSM {
  geo_soi: any;
}

interface Step {
  name: string;
  // function: (
  //   outputs: Record<string, any>
  // ) => Promise<{ transformedLoksabhaConstituencies: any[]; status: "SUCCESS" | "FAILURE" | "PARTIAL" }>;
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

const loksabhaConstituenciesProgressDir = path.join(__dirname, "loksabha-constituency-pipeline-logs");
const progressStatusFile = path.join(loksabhaConstituenciesProgressDir, "progressStatus.json");

function initializeDirectories(): void {
  fs.mkdirSync(loksabhaConstituenciesProgressDir, { recursive: true });
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
    loksabhaConstituenciesProgressDir,
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

async function fetchStateLoksabhaConstituencies(outputs: Record<string, any>): Promise<{
  stateLoksabhaConstituencies: StateLoksabhaConstituencies;
  loksabhaConstituenciesCount: number;
  status: "SUCCESS" | "FAILURE" | "PARTIAL";
}> {
  const { stateName } = outputs;

  try {
    const stateLoksabhaConstituencies = loksabhaConstituenciesList.find((val: any) => val.state === stateName) as any;
    stateLoksabhaConstituencies.loksabhaConstituencies = stateLoksabhaConstituencies?.loksabhaConstituencies.map(
      (val: any) => ({
        names: [val.name],
        wikipedia_page: val.wikipedia_page,
        states_union_territories: stateLoksabhaConstituencies.name_id,
      })
    );

    return {
      stateLoksabhaConstituencies,
      loksabhaConstituenciesCount: stateLoksabhaConstituencies.loksabhaConstituencies.length,
      status: "SUCCESS",
    };
  } catch (e) {
    throw e;
  }
}

async function fetchLoksabhaConstituenciesWikiDetails(outputs: Record<string, any>): Promise<any> {
  const { stateLoksabhaConstituencies } = outputs;

  let status: "SUCCESS" | "PARTIAL" | "FAILURE" = "SUCCESS";
  try {
    const urls = map(stateLoksabhaConstituencies.loksabhaConstituencies, (val) => val.wikipedia_page);
    const { success, failure } = await processListOfWikipediaPages(urls);

    if (failure.length) status = "PARTIAL";

    return {
      loksabhaConstituenciesWikiDetails: success,
      loksabhaConstituenciesWikiDetailsFailed: failure,
      status,
    };
  } catch (e) {
    throw e;
  }
}

async function fetchLoksabhaConstituencyECIGeoFeatures(outputs: Record<string, any>): Promise<any> {
  const { stateName } = outputs;
  const loksabhaConstituenciesGeoECI = require("../d.geo.json");

  try {
    const loksabhaConstituencyFeaturesECI = loksabhaConstituenciesGeoECI?.filter(
      (dist: any) => dist.properties.stname.toLowerCase() === stateName.toLowerCase()
    );

    if (loksabhaConstituencyFeaturesECI?.length) {
      return { loksabhaConstituencyFeaturesECI, status: "SUCCESS" };
    } else {
      return { status: "FAILURE" };
    }
  } catch (e) {
    throw e;
  }
}

async function transformLoksabhaConstituenciesWikipediaData(outputs: Record<string, any>): Promise<any> {
  const { loksabhaConstituenciesWikiDetails, stateLoksabhaConstituencies } = outputs;

  const keyedLoksabhaConstituencies: Record<string, LoksabhaConstituency> = keyBy(
    stateLoksabhaConstituencies.loksabhaConstituencies,
    "wikipedia_page"
  );
  const transformedLoksabhaConstituenciesWikipedia: LoksabhaConstituencyTransformationWikidata[] = [];
  const missingUrls: string[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  loksabhaConstituenciesWikiDetails.forEach((wikiLoksabhaConstituency: WikiLoksabhaConstituencyResult) => {
    if (!keyedLoksabhaConstituencies[wikiLoksabhaConstituency.url]) {
      missingUrls.push(wikiLoksabhaConstituency.url);
      status = "PARTIAL";
    } else {
      if (wikiLoksabhaConstituency.results.wikidata_qid) {
        transformedLoksabhaConstituenciesWikipedia.push({
          ...keyedLoksabhaConstituencies[wikiLoksabhaConstituency.url],
          wikidata_qid: wikiLoksabhaConstituency.results.wikidata_qid,
        });

        delete keyedLoksabhaConstituencies[wikiLoksabhaConstituency.url];
      }
    }
  });

  if (size(keyedLoksabhaConstituencies)) {
    status = "PARTIAL";
  }

  return {
    transformedLoksabhaConstituenciesWikipedia,
    loksabhaConstituenciesNotTransformedWikipedia: Object.values(keyedLoksabhaConstituencies),
    status,
  };
}

async function transformLoksabhaConstituenciesWithOSM(outputs: Record<string, any>): Promise<any> {
  const { loksabhaConstituenciesOSMDetails, transformedLoksabhaConstituenciesWikipedia } = outputs;

  const fullMatchLoksabhaConstituenciesOSMWiki: LoksabhaConstituencyTransformationOSM[] = [];
  const partialMatchLoksabhaConstituenciesOSMWiki: LoksabhaConstituencyTransformationOSM[] = [];
  const unmatchedLoksabhaConstituencies: LoksabhaConstituencyTransformationWikidata[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  transformedLoksabhaConstituenciesWikipedia.forEach(
    (loksabhaConstituency: LoksabhaConstituencyTransformationWikidata) => {
      const matchedOSMDetail = loksabhaConstituenciesOSMDetails.find((osmDetail: any) => {
        const localnameMatch = loksabhaConstituency.names.includes(osmDetail.localname);
        const wikidataMatch = osmDetail.extratags?.wikidata === loksabhaConstituency.wikidata_qid;
        return localnameMatch || wikidataMatch;
      });

      if (matchedOSMDetail) {
        const localnameMatch = matchedOSMDetail.localname === loksabhaConstituency.names[0];
        const wikidataMatch = matchedOSMDetail.extratags?.wikidata === loksabhaConstituency.wikidata_qid;
        // const matchQuality = localnameMatch && wikidataMatch ? "100%" : "50%";

        if (localnameMatch && wikidataMatch)
          fullMatchLoksabhaConstituenciesOSMWiki.push({
            ...loksabhaConstituency,
            osm_id: matchedOSMDetail.osm_id.toString(),
            localnameMatch,
            wikidataMatch,
            geo_osm: matchedOSMDetail,
          });
        else if (localnameMatch || wikidataMatch) {
          partialMatchLoksabhaConstituenciesOSMWiki.push({
            ...loksabhaConstituency,
            osm_id: matchedOSMDetail.osm_id.toString(),
            localnameMatch,
            wikidataMatch,
            geo_osm: matchedOSMDetail,
          });
          status = "PARTIAL";
        }
      } else {
        unmatchedLoksabhaConstituencies.push(loksabhaConstituency);
        status = "PARTIAL";
      }
    }
  );

  return {
    fullMatchLoksabhaConstituenciesOSMWiki,
    partialMatchLoksabhaConstituenciesOSMWiki,
    allMatchedLoksabhaConstituenciesOSMWiki: [
      ...fullMatchLoksabhaConstituenciesOSMWiki,
      ...partialMatchLoksabhaConstituenciesOSMWiki,
    ],
    unmatchedLoksabhaConstituenciesOSMWiki: unmatchedLoksabhaConstituencies,
    status,
  };
}

async function transformLoksabhaConstituenciesWithECIGeo(outputs: Record<string, any>): Promise<any> {
  const { loksabhaConstituencyFeaturesECI, allMatchedLoksabhaConstituenciesOSMWiki } = outputs;

  const transformedLoksabhaConstituenciesECIGeo: LoksabhaConstituencyTransformationECIGeo[] = [];
  const unmatchedLoksabhaConstituencies: LoksabhaConstituencyTransformationOSM[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  // // Filter loksabhaConstituenciesGeoECI for the given state
  // const stateLoksabhaConstituenciesGeoECI: GeoJSONFeature[] = loksabhaConstituenciesGeoECI.filter(
  //   (feature: GeoJSONFeature) => feature.properties.stname.toLowerCase() === stateName.toLowerCase()
  // );

  allMatchedLoksabhaConstituenciesOSMWiki.forEach((loksabhaConstituency: LoksabhaConstituencyTransformationOSM) => {
    const matchedGeoDetail = loksabhaConstituencyFeaturesECI.find((geoDetail: GeoJSONFeature) => {
      const lowerCaseLoksabhaConstituencyNames = loksabhaConstituency.names.map((n) => n.toLowerCase());
      return lowerCaseLoksabhaConstituencyNames.includes(geoDetail.properties.dtname.toLowerCase());
    });

    if (matchedGeoDetail) {
      transformedLoksabhaConstituenciesECIGeo.push({
        ...loksabhaConstituency,
        geo_soi: matchedGeoDetail,
      });
    } else {
      unmatchedLoksabhaConstituencies.push(loksabhaConstituency);
      status = "PARTIAL";
    }
  });

  return {
    transformedLoksabhaConstituenciesECIGeo,
    unmatchedLoksabhaConstituenciesECIGeo: unmatchedLoksabhaConstituencies,
    status,
  };
}

async function addLoksabhaConstituencyDataToKnowledgeGraph(outputs: Record<string, any>) {
  const { transformedLoksabhaConstituenciesECIGeo } = outputs;

  let savedToKnowledgeGraph: any = [];
  for (let td of transformedLoksabhaConstituenciesECIGeo) {
    const graphQLClient = await createGraphQLClient();

    let toSaveLoksabhaConstituency = {
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

    const loksabhaConstituencyMapOSM = polygonToMultiPolygon(td.geo_osm);
    const loksabhaConstituencyMapECI = polygonToMultiPolygon(td.geo_soi);

    let geo_eci = {
      area: multiPolygonToDgraphMultiPolygon(loksabhaConstituencyMapECI.geometry.coordinates),
      category: "Region",
      source_name: "Election Commission Of India",
      //   source_url: `https://results.eci.gov.in/PcResultGenJune2024/pc/${lc.geo.properties.ST_CODE}.js`,
      source_data: `${JSON.stringify(td.geo_soi)}`,
    };

    let nameIds: any = [];
    for (let n of toSaveLoksabhaConstituency.names) {
      const nameId = await upsert_Name_(n.name);
      nameIds.push({ id: nameId });
    }

    const loksabhaConstituencyId = await createNodeType(
      "_Indian_Loksabha_Constituency_",
      graphQLClient,
      toSaveLoksabhaConstituency
    );

    const geoECIId = await createNodeType("_Geo_", graphQLClient, geo_eci);

    let toSaveLoksabhaConstituencyRegion = {
      self: { name_id: toSaveLoksabhaConstituency.name_id },
      geo_boundary: [
        {
          id: geoECIId,
        },
      ],
      node_created_on: new Date(),
    };

    // save loksabhaConstituency region
    const loksabhaConstituencyRegionId = await createNodeType(
      "_Indian_Loksabha_Constituency_Region_",
      graphQLClient,
      toSaveLoksabhaConstituencyRegion
    );

    savedToKnowledgeGraph.push({
      names: nameIds,
      loksabhaConstituency: {
        loksabhaConstituencyId,
        toSaveLoksabhaConstituency,
      },
      loksabhaConstituencyRegion: {
        loksabhaConstituencyRegionId,
        toSaveLoksabhaConstituencyRegion,
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
    stateLoksabhaConstituencies: {},
    loksabhaConstituenciesCount: 0,
    loksabhaConstituenciesWikiDetails: [],
    loksabhaConstituenciesWikiDetailsFailed: [],
    loksabhaConstituencyFeaturesECI: [],
    transformedLoksabhaConstituenciesWikipedia: [],
    loksabhaConstituenciesNotTransformedWikipedia: [],
    transformedLoksabhaConstituenciesECIGeo: [],
    unmatchedLoksabhaConstituenciesECIGeo: [],
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
      name: "Fetch State Loksabha_Constituency",
      function: fetchStateLoksabhaConstituencies,
      key: "STATE_VIDHANSABHA_LIST",
      input: stateName,
    },
    {
      name: "Fetch Loksabha_Constituency Wiki Details",
      function: fetchLoksabhaConstituenciesWikiDetails,
      key: "STATE_VIDHANSABHA_CONSTITUENCY_WIKI_DATA",
      input: null, // Will be set after the first step
    },
    {
      name: "Fetch LoksabhaConstituency ECI Geo Features",
      function: fetchLoksabhaConstituencyECIGeoFeatures,
      key: "STATE_VIDHANSABHA_CONSTITUENCY_ECI_GEO_DATA",
      input: stateName,
    },
    {
      name: "Append Wikipedia Data",
      function: transformLoksabhaConstituenciesWikipediaData,
      input: null, // Will be set after the fifth step
      key: "APPEND_WIKIPEDIA_DATA_TRANSFORM_STATE_VIDHANSABHA_CONSTITUENCY_DATA",
    },
    {
      name: "Transform Loksabha_Constituency with ECI Geo",
      function: transformLoksabhaConstituenciesWithECIGeo,
      input: null, // Will be set after the sixth and seventh steps
      key: "APPEND_ECI_DATA_TRANSFORM_STATE_VIDHANSABHA_CONSTITUENCY_DATA",
    },
    {
      name: "Save Loksabha_Constituency to KnowledgeGraph",
      function: addLoksabhaConstituencyDataToKnowledgeGraph,
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

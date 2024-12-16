import path from "path";
import fs from "fs";
import { keyBy, map, size } from "lodash";
import { districtsList } from "../all-states-districts-list";

import { queryNodeType, createNodeType } from "../../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../../knowledge-graph/generic/generic.utils";
import { fetchByRelationId, fetchDistrictsOSMRelationIdsForState } from "../../../maps/india-osm/states.fetch-geojsons";
import { processListOfWikipediaPages } from "../extract-district-page-data";
import { upsert_Name_ } from "../../../knowledge-graph/name/name.update";
import { multiPolygonToDgraphMultiPolygon, polygonToMultiPolygon } from "../../states/andhra-pradesh/scripts/districts";

interface District {
  names: string[];
  wikipedia_page: string;
  states_union_territories: string;
}

interface StateDistricts {
  state: string;
  name_id: string;
  districts: District[];
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

interface DistrictsTransformationWikidata extends District {
  wikidata_qid: string;
}

interface StateDistrictsTransformationWikidata {
  state: string;
  name_id: string;
  districts: DistrictsTransformationWikidata[];
}

interface WikiDistrictResult {
  url: string;
  results: {
    wikidata_qid?: string;
    wikipedia_page?: string;
    last_updated_on?: string;
  };
}

interface DistrictsTransformationWikidata extends District {
  wikidata_qid: string;
  wikipedia_page: string;
}

interface DistrictsTransformationOSM extends DistrictsTransformationWikidata {
  osm_id: string;
  // match_quality: "100%" | "50%";
  localnameMatch: Boolean;
  wikidataMatch: Boolean;
  geo_osm: any;
}

interface DistrictsTransformationSOIGeo extends DistrictsTransformationOSM {
  geo_soi: any;
}

interface Step {
  name: string;
  // function: (
  //   outputs: Record<string, any>
  // ) => Promise<{ transformedDistricts: any[]; status: "SUCCESS" | "FAILURE" | "PARTIAL" }>;
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

const districtsProgressDir = path.join(__dirname, "district-pipeline-logs");
const progressStatusFile = path.join(districtsProgressDir, "progressStatus.json");

function initializeDirectories(): void {
  fs.mkdirSync(districtsProgressDir, { recursive: true });
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
  const progressDataLogFile = path.join(districtsProgressDir, `${iteration.iteration}.${progressData.key}.log.json`);

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

async function fetchStateDistricts(
  outputs: Record<string, any>
): Promise<{ stateDistricts: StateDistricts; districtsCount: number; status: "SUCCESS" | "FAILURE" | "PARTIAL" }> {
  const { stateName } = outputs;

  try {
    const stateDistricts = districtsList.find((val: any) => val.state === stateName) as any;
    stateDistricts.districts = stateDistricts?.districts.map((val: any) => ({
      names: [val.name],
      wikipedia_page: val.wikipedia_page,
      states_union_territories: stateDistricts.name_id,
    }));

    return { stateDistricts, districtsCount: stateDistricts.districts.length, status: "SUCCESS" };
  } catch (e) {
    throw e;
  }
}

async function fetchStateOSMData(outputs: Record<string, any>): Promise<any> {
  const { stateDistricts } = outputs;
  const graphQLClient = await createGraphQLClient();

  try {
    const stateDetails = await queryNodeType("_Indian_State_Union_Territory_", graphQLClient, stateDistricts.name_id, [
      "osm_id",
      "id",
      "regions { geo_boundary { source_data } } ",
    ]);
    const stateOSMData: any = JSON.parse(stateDetails[0].regions[0].geo_boundary[0].source_data);

    const relevantData = {
      state_union_territory_id: stateDetails[0].id,
      state_union_territory_osm_id: stateDetails[0].osm_id,
      state_osm_data: { localname: stateOSMData.localname, admin_level: stateOSMData.admin_level },
    };

    return { ...relevantData, status: "SUCCESS" };
  } catch (e) {
    throw e;
  }
}

async function fetchDistrictsOSMRelationIds(outputs: Record<string, any>): Promise<any> {
  const { state_osm_data } = outputs;

  try {
    const districtsOSMList = await fetchDistrictsOSMRelationIdsForState(
      state_osm_data.localname,
      state_osm_data.admin_level.toString(),
      5
    );

    return {
      districtsRelationIds: districtsOSMList.elements,
      osmDistrictsCount: districtsOSMList.elements.length,
      status: "SUCCESS",
    };
  } catch (e) {
    throw e;
  }
}

async function fetchDistrictsOSMDetails(outputs: Record<string, any>): Promise<any> {
  const { districtsRelationIds, districtsCount } = outputs;
  let districtsOSMDetails: any[] = [];
  let districtsOSMDetailsStepSuccessStatus: "SUCCESS" | "PARTIAL" | "FAILURE" = "SUCCESS";
  let districtsOSMDetailsNotFound: any[] = [];

  let osmDetailsDistrictsCount = 0;

  try {
    for (let osmd of districtsRelationIds) {
      try {
        let osmDistrict = await fetchByRelationId(osmd.id);
        districtsOSMDetails.push(osmDistrict);
        osmDetailsDistrictsCount += 1;
      } catch (e1) {
        districtsOSMDetailsNotFound.push({
          osmID: osmd.id,
          error: e1,
        });
        districtsOSMDetailsStepSuccessStatus = "PARTIAL";
      }
    }

    if (districtsOSMDetails.length !== districtsCount) districtsOSMDetailsStepSuccessStatus = "PARTIAL";

    return {
      districtsOSMDetails,
      districtsOSMDetailsNotFound,
      osmDetailsDistrictsCount,
      status: districtsOSMDetailsStepSuccessStatus,
    };
  } catch (e) {
    throw e;
  }
}

async function fetchDistrictsWikiDetails(outputs: Record<string, any>): Promise<any> {
  const { stateDistricts } = outputs;
  let status: "SUCCESS" | "PARTIAL" | "FAILURE" = "SUCCESS";
  try {
    const urls = map(stateDistricts.districts, (val) => val.wikipedia_page);
    const { success, failure } = await processListOfWikipediaPages(urls);

    if (failure.length) status = "PARTIAL";

    return { districtsWikiDetails: success, districtsWikiDetailsFailed: failure, status };
  } catch (e) {
    throw e;
  }
}

async function fetchDistrictSOIGeoFeatures(outputs: Record<string, any>): Promise<any> {
  const { stateName } = outputs;
  const districtsGeoSOI = require("../d.geo.json");

  try {
    const districtFeaturesSOI = districtsGeoSOI?.filter(
      (dist: any) => dist.properties.stname.toLowerCase() === stateName.toLowerCase()
    );

    if (districtFeaturesSOI?.length) {
      return { districtFeaturesSOI, status: "SUCCESS" };
    } else {
      return { status: "FAILURE" };
    }
  } catch (e) {
    throw e;
  }
}

async function transformDistrictsWikipediaData(outputs: Record<string, any>): Promise<any> {
  const { districtsWikiDetails, stateDistricts } = outputs;

  const keyedDistricts: Record<string, District> = keyBy(stateDistricts.districts, "wikipedia_page");
  const transformedDistrictsWikipedia: DistrictsTransformationWikidata[] = [];
  const missingUrls: string[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  districtsWikiDetails.forEach((wikiDistrict: WikiDistrictResult) => {
    if (!keyedDistricts[wikiDistrict.url]) {
      missingUrls.push(wikiDistrict.url);
      status = "PARTIAL";
    } else {
      if (wikiDistrict.results.wikidata_qid) {
        transformedDistrictsWikipedia.push({
          ...keyedDistricts[wikiDistrict.url],
          wikidata_qid: wikiDistrict.results.wikidata_qid,
        });

        delete keyedDistricts[wikiDistrict.url];
      }
    }
  });

  if (size(keyedDistricts)) {
    status = "PARTIAL";
  }

  return { transformedDistrictsWikipedia, districtsNotTransformedWikipedia: Object.values(keyedDistricts), status };
}

async function transformDistrictsWithOSM(outputs: Record<string, any>): Promise<any> {
  const { districtsOSMDetails, transformedDistrictsWikipedia } = outputs;

  const fullMatchDistrictsOSMWiki: DistrictsTransformationOSM[] = [];
  const partialMatchDistrictsOSMWiki: DistrictsTransformationOSM[] = [];
  const unmatchedDistricts: DistrictsTransformationWikidata[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  transformedDistrictsWikipedia.forEach((district: DistrictsTransformationWikidata) => {
    const matchedOSMDetail = districtsOSMDetails.find((osmDetail: any) => {
      const localnameMatch = district.names.includes(osmDetail.localname);
      const wikidataMatch = osmDetail.extratags?.wikidata === district.wikidata_qid;
      return localnameMatch || wikidataMatch;
    });

    if (matchedOSMDetail) {
      const localnameMatch = matchedOSMDetail.localname === district.names[0];
      const wikidataMatch = matchedOSMDetail.extratags?.wikidata === district.wikidata_qid;
      // const matchQuality = localnameMatch && wikidataMatch ? "100%" : "50%";

      if (localnameMatch && wikidataMatch)
        fullMatchDistrictsOSMWiki.push({
          ...district,
          osm_id: matchedOSMDetail.osm_id.toString(),
          localnameMatch,
          wikidataMatch,
          geo_osm: matchedOSMDetail,
        });
      else if (localnameMatch || wikidataMatch) {
        partialMatchDistrictsOSMWiki.push({
          ...district,
          osm_id: matchedOSMDetail.osm_id.toString(),
          localnameMatch,
          wikidataMatch,
          geo_osm: matchedOSMDetail,
        });
        status = "PARTIAL";
      }
    } else {
      unmatchedDistricts.push(district);
      status = "PARTIAL";
    }
  });

  return {
    fullMatchDistrictsOSMWiki,
    partialMatchDistrictsOSMWiki,
    allMatchedDistrictsOSMWiki: [...fullMatchDistrictsOSMWiki, ...partialMatchDistrictsOSMWiki],
    unmatchedDistrictsOSMWiki: unmatchedDistricts,
    status,
  };
}

async function transformDistrictsWithSOIGeo(outputs: Record<string, any>): Promise<any> {
  const { districtFeaturesSOI, allMatchedDistrictsOSMWiki } = outputs;

  const transformedDistrictsSOIGeo: DistrictsTransformationSOIGeo[] = [];
  const unmatchedDistricts: DistrictsTransformationOSM[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  // // Filter districtsGeoSOI for the given state
  // const stateDistrictsGeoSOI: GeoJSONFeature[] = districtsGeoSOI.filter(
  //   (feature: GeoJSONFeature) => feature.properties.stname.toLowerCase() === stateName.toLowerCase()
  // );

  allMatchedDistrictsOSMWiki.forEach((district: DistrictsTransformationOSM) => {
    const matchedGeoDetail = districtFeaturesSOI.find((geoDetail: GeoJSONFeature) => {
      const lowerCaseDistrictNames = district.names.map((n) => n.toLowerCase());
      return lowerCaseDistrictNames.includes(geoDetail.properties.dtname.toLowerCase());
    });

    if (matchedGeoDetail) {
      transformedDistrictsSOIGeo.push({
        ...district,
        geo_soi: matchedGeoDetail,
      });
    } else {
      unmatchedDistricts.push(district);
      status = "PARTIAL";
    }
  });

  return { transformedDistrictsSOIGeo, unmatchedDistrictsSOIGeo: unmatchedDistricts, status };
}

async function addDistrictDataToKnowledgeGraph(outputs: Record<string, any>) {
  const { transformedDistrictsSOIGeo } = outputs;

  let savedToKnowledgeGraph: any = [];
  for (let td of transformedDistrictsSOIGeo) {
    const graphQLClient = await createGraphQLClient();

    let toSaveDistrict = {
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

    const districtMapOSM = polygonToMultiPolygon(td.geo_osm);
    const districtMapSOI = polygonToMultiPolygon(td.geo_soi);

    // states_union_territories
    let geo_osm = {
      category: "Region",
      area: multiPolygonToDgraphMultiPolygon(districtMapOSM.geometry.coordinates),
      source_name: "OpenStreetMap",
      source_url: `https://nominatim.openstreetmap.org/details.php?osmtype=R&osmid=${toSaveDistrict.osm_id}&class=boundary&addressdetails=1&hierarchy=0&group_hierarchy=1&polygon_geojson=1&format=json`,
      source_data: `${JSON.stringify(td.geo_osm)}`,
    };

    let geo_soi = {
      category: "Region",
      area: multiPolygonToDgraphMultiPolygon(districtMapSOI.geometry.coordinates),
      source_name: "Survey of India",
      source_url: `https://onlinemaps.surveyofindia.gov.in/`,
      source_data: `${JSON.stringify(td.geo_soi)}`,
    };

    let nameIds: any = [];
    for (let n of toSaveDistrict.names) {
      const nameId = await upsert_Name_(n.name);
      nameIds.push({ id: nameId });
    }

    const districtId = await createNodeType("_Indian_District_", graphQLClient, toSaveDistrict);

    const geoSOIId = await createNodeType("_Geo_", graphQLClient, geo_soi);
    const geoOSMId = await createNodeType("_Geo_", graphQLClient, geo_osm);

    let toSaveDistrictRegion = {
      self: { name_id: toSaveDistrict.name_id },
      geo_boundary: [
        {
          id: geoSOIId,
        },
        {
          id: geoOSMId,
        },
      ],
      node_created_on: new Date(),
    };

    // save district region
    const districtRegionId = await createNodeType("_Indian_District_Region_", graphQLClient, toSaveDistrictRegion);

    savedToKnowledgeGraph.push({
      names: nameIds,
      district: {
        districtId,
        toSaveDistrict,
      },
      districtRegion: {
        districtRegionId,
        toSaveDistrictRegion,
      },
      geo: {
        geo_osm: {
          geo_osm,
          geoOSMId,
        },
        geo_soi: {
          geo_soi,
          geoSOIId,
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
    stateDistricts: {},
    districtsCount: 0,
    state_union_territory_id: "",
    state_union_territory_osm_id: "",
    state_osm_data: {},
    districtsRelationIds: {},
    osmDistrictsCount: 0,
    districtsOSMDetails: [],
    districtsOSMDetailsNotFound: [],
    osmDetailsDistrictsCount: 0,
    districtsWikiDetails: [],
    districtsWikiDetailsFailed: [],
    districtFeaturesSOI: [],
    transformedDistrictsWikipedia: [],
    districtsNotTransformedWikipedia: [],
    fullMatchDistrictsOSMWiki: [],
    partialMatchDistrictsOSMWiki: [],
    allMatchedDistrictsOSMWiki: [],
    unmatchedDistrictsOSMWiki: [],
    transformedDistrictsSOIGeo: [],
    unmatchedDistrictsSOIGeo: [],
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
  console.log("DISTRICTS PROCESSING INITIALIZED: ", stateName);

  const steps: Step[] = [
    {
      name: "Fetch State Districts",
      function: fetchStateDistricts,
      key: "STATE_DISTRICTS_LIST",
      input: stateName,
    },
    {
      name: "Fetch State OSM Data",
      function: fetchStateOSMData,
      key: "STATE_OSM_DATA",
      input: null,
    },
    {
      name: "Fetch Districts OSM Relation IDs",
      function: fetchDistrictsOSMRelationIds,
      key: "STATE_DISTRICTS_OSM_RELATION_IDS",
      input: null, // Will be set after the second step
    },
    {
      name: "Fetch Districts OSM Details",
      function: fetchDistrictsOSMDetails,
      key: "STATE_DISTRICTS_OSM_RELATION_IDS",

      input: null, // Will be set after the third step
    },
    {
      name: "Fetch Districts Wiki Details",
      function: fetchDistrictsWikiDetails,
      key: "STATE_DISTRICTS_WIKI_DATA",
      input: null, // Will be set after the first step
    },
    {
      name: "Fetch District SOI Geo Features",
      function: fetchDistrictSOIGeoFeatures,
      key: "STATE_DISTRICTS_SOI_GEO_DATA",
      input: stateName,
    },
    {
      name: "Append Wikipedia Data",
      function: transformDistrictsWikipediaData,
      input: null, // Will be set after the fifth step
      key: "APPEND_WIKIPEDIA_DATA_TRANSFORM_STATE_DISTRICTS_DATA",
    },
    {
      name: "Transform Districts with OSM",
      function: transformDistrictsWithOSM,
      input: null, // Will be set after the fourth and seventh steps
      key: "APPEND_OSM_DATA_TRANSFORM_STATE_DISTRICTS_DATA",
    },
    {
      name: "Transform Districts with SOI Geo",
      function: transformDistrictsWithSOIGeo,
      input: null, // Will be set after the sixth and seventh steps
      key: "APPEND_SOI_DATA_TRANSFORM_STATE_DISTRICTS_DATA",
    },
    {
      name: "Save Districts to KnowledgeGraph",
      function: addDistrictDataToKnowledgeGraph,
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

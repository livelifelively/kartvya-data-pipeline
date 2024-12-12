import path from "path";
import fs from "fs";
import { keyBy, map, size } from "lodash";
import { districts } from "../../../districts/all-states-districts-list";
import { queryNodeType } from "../../../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../../../knowledge-graph/generic/generic.utils";
import { fetchByRelationId, fetchDistrictsForState } from "../../../../maps/india-osm/states.fetch-geojsons";
import districtsGeoSOI from "../../../districts/india.d.geojson";
import { processListOfWikipediaPages } from "../../../districts/extract-district-page-data";

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

interface ProgressIteration {
  iteration: number;
  timeStamp: Date;
  steps: ProgressStep[];
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
}

interface DistrictsTransformationOSM extends DistrictsTransformationWikidata {
  osm_id: string;
  match_quality: "100%" | "50%";
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

function getCurrentIteration(): ProgressIteration {
  const progressStatus: ProgressIteration[] = JSON.parse(fs.readFileSync(progressStatusFile, "utf8"));
  if (progressStatus.length === 0) {
    return { iteration: 1, timeStamp: new Date(), steps: [] };
  }
  const lastIteration = progressStatus[progressStatus.length - 1];
  return {
    iteration: lastIteration.iteration + 1,
    timeStamp: new Date(),
    steps: [],
  };
}

function logProgress(
  progressData: ProgressData,
  status: "SUCCESS" | "FAILURE" | "PARTIAL",
  iteration: ProgressIteration
): void {
  const progressStatus: ProgressIteration[] = JSON.parse(fs.readFileSync(progressStatusFile, "utf8"));
  const progressDataLogFile = path.join(districtsProgressDir, `${iteration.steps.length}.${progressData.key}.log.json`);

  iteration.steps.push({
    step: iteration.steps.length,
    logFile: progressDataLogFile,
    status,
  });

  let existingLogs: ProgressData[] = [];
  if (fs.existsSync(progressDataLogFile)) {
    existingLogs = JSON.parse(fs.readFileSync(progressDataLogFile, "utf8"));
  }

  existingLogs.push({ ...progressData, timeStamp: new Date() });
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
): Promise<{ stateDistricts: StateDistricts; status: "SUCCESS" | "FAILURE" | "PARTIAL" }> {
  const { stateName } = outputs;

  try {
    const stateDistricts = districts.find((val: any) => val.state === stateName) as any;
    stateDistricts.districts = stateDistricts?.districts.map((val: any) => ({
      names: [val.name],
      wikipedia_page: val.wikipedia_page,
      states_union_territories: stateDistricts.name_id,
    }));

    return { stateDistricts, status: "SUCCESS" };
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

    return { relevantData, status: "SUCCESS" };
  } catch (e) {
    throw e;
  }
}

async function fetchDistrictsOSMRelationIds(outputs: Record<string, any>): Promise<any> {
  const { stateOSMData } = outputs;

  try {
    const districtsOSMList = await fetchDistrictsForState(
      stateOSMData.state_osm_data.localname,
      stateOSMData.state_osm_data.admin_level.toString(),
      5
    );

    return {
      districtsRelationIds: districtsOSMList.elements,
      status: "SUCCESS",
    };
  } catch (e) {
    throw e;
  }
}

async function fetchDistrictsOSMDetails(outputs: Record<string, any>): Promise<any> {
  const { districtsRelationIds } = outputs;
  let districtsOSMDetails: any[] = [];
  let districtsOSMDetailsStepSuccessStatus: "SUCCESS" | "PARTIAL" | "FAILURE" = "SUCCESS";

  try {
    for (let osmd of districtsRelationIds) {
      try {
        let osmDistrict = await fetchByRelationId(osmd.id);
        districtsOSMDetails.push(osmDistrict);
      } catch (e1) {
        districtsOSMDetails.push({
          osmID: osmd.id,
          error: e1,
        });
        districtsOSMDetailsStepSuccessStatus = "PARTIAL";
      }
    }

    return { districtsOSMDetails, status: districtsOSMDetailsStepSuccessStatus };
  } catch (e) {
    throw e;
  }
}

async function fetchDistrictsWikiDetails(outputs: Record<string, any>): Promise<any> {
  const { stateDistricts } = outputs;

  try {
    const urls = map(stateDistricts.districts, (val) => val.wikipedia_page);
    const districtsWikiDetails = await processListOfWikipediaPages(urls);

    return { districtsWikiDetails, status: "SUCCESS" };
  } catch (e) {
    throw e;
  }
}
async function fetchDistrictSOIGeoFeatures(outputs: Record<string, any>): Promise<any> {
  const { stateName } = outputs;

  try {
    const districtFeaturesSOI = (districtsGeoSOI as GeoJSON)?.features?.filter(
      (dist) => dist.properties.stname.toLowerCase() === stateName.toLowerCase()
    );

    if (districtFeaturesSOI.length) {
      return { districtFeaturesSOI, status: "SUCCESS" };
    } else {
      throw new Error("No SOI geo features found");
    }
  } catch (e) {
    throw e;
  }
}

async function transformDistrictsWikipediaData(outputs: Record<string, any>): Promise<{
  transformedDistrictsWikipedia: DistrictsTransformationWikidata[];
  status: "SUCCESS" | "FAILURE" | "PARTIAL";
}> {
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

  return { transformedDistrictsWikipedia, status };
}

async function transformDistrictsWithOSM(
  outputs: Record<string, any>
): Promise<{ transformedDistrictsOSM: DistrictsTransformationOSM[]; status: "SUCCESS" | "FAILURE" | "PARTIAL" }> {
  const { districtsOSMDetails, districtsWithWikidata } = outputs;

  const transformedDistrictsOSM: DistrictsTransformationOSM[] = [];
  const unmatchedDistricts: DistrictsTransformationWikidata[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  districtsWithWikidata.forEach((district: DistrictsTransformationWikidata) => {
    const matchedOSMDetail = districtsOSMDetails.find((osmDetail: any) => {
      const localnameMatch = osmDetail.localname === district.names[0];
      const wikidataMatch = osmDetail.extratags?.wikidata === district.wikidata_qid;
      return localnameMatch || wikidataMatch;
    });

    if (matchedOSMDetail) {
      const localnameMatch = matchedOSMDetail.localname === district.names[0];
      const wikidataMatch = matchedOSMDetail.extratags?.wikidata === district.wikidata_qid;
      const matchQuality = localnameMatch && wikidataMatch ? "100%" : "50%";

      transformedDistrictsOSM.push({
        ...district,
        osm_id: matchedOSMDetail.osm_id.toString(),
        match_quality: matchQuality,
        geo_osm: matchedOSMDetail,
      });
    } else {
      unmatchedDistricts.push(district);
      status = "PARTIAL";
    }
  });

  return { transformedDistrictsOSM, status };
}

async function transformDistrictsWithSOIGeo(
  outputs: Record<string, any>
): Promise<{ transformedDistrictsSOIGeo: DistrictsTransformationSOIGeo[]; status: "SUCCESS" | "FAILURE" | "PARTIAL" }> {
  const { districtsGeoSOI, districtsWithOSM, stateName } = outputs;

  const transformedDistrictsSOIGeo: DistrictsTransformationSOIGeo[] = [];
  const unmatchedDistricts: DistrictsTransformationOSM[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  // Filter districtsGeoSOI for the given state
  const stateDistrictsGeoSOI: GeoJSONFeature[] = districtsGeoSOI.filter(
    (feature: GeoJSONFeature) => feature.properties.stname.toLowerCase() === stateName.toLowerCase()
  );

  districtsWithOSM.forEach((district: DistrictsTransformationOSM) => {
    const matchedGeoDetail = stateDistrictsGeoSOI.find((geoDetail: GeoJSONFeature) => {
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

  return { transformedDistrictsSOIGeo, status };
}

async function orchestrationFunction(steps: Step[], iteration: ProgressIteration): Promise<void> {
  let outputs: Record<string, any> = {};

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];

    // Check if the step has already been completed successfully
    const progressStep = iteration.steps.find((s) => s.step === i);
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
          key: `STEP_${i}_${step.name}_SUCCESS`,
        },
        "SUCCESS",
        iteration
      );
    } catch (error: any) {
      logProgress(
        {
          message: `Step ${i} (${step.name}) failed.`,
          data: {},
          error: step.status !== "PARTIAL" ? { error: error.message } : {},
          key: `STEP_${i}_${step.name}_FAILURE`,
        },
        step.status || "FAILURE",
        iteration
      );
      console.error(`Step ${i} (${step.name}) failed. Manual intervention required.`);
      throw new Error(`Step ${i} (${step.name}) failed. Manual intervention required.`);
    }

    // Update the progress iteration with the current step status
    iteration.steps.push({
      step: i,
      logFile: `step_${i}_${step.name}.log.json`,
      status: step.status,
    });

    // Save the updated iteration status to the progress status file
    const progressStatus: ProgressIteration[] = JSON.parse(fs.readFileSync(progressStatusFile, "utf8"));
    const existingIterationIndex = progressStatus.findIndex((iter) => iter.iteration === iteration.iteration);
    if (existingIterationIndex !== -1) {
      progressStatus[existingIterationIndex] = iteration;
    } else {
      progressStatus.push(iteration);
    }
    fs.writeFileSync(progressStatusFile, JSON.stringify(progressStatus, null, 2));
  }
}

(async () => {
  initializeDirectories();
  const stateName = "andaman and nicobar islands";
  console.log("DISTRICTS PROCESSING INITIALIZED: ", stateName);

  const iteration = getCurrentIteration();

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
  ];

  try {
    await orchestrationFunction(steps, iteration);
  } catch (error) {
    console.error("Error in processing: ", error);
  }
})();

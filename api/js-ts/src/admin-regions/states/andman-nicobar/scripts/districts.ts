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

// interface ExtractDistrictStep1 {
//   name_id: string;
//   names: string[];
//   states_union_territories: string[];
//   wikipedia_page: string;
//   // osm_id: string;
//   // established_on?: string;
//   // disestablished_on?: string;
//   // node_created_on: string;
// }

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

async function fetchStateDistricts(stateName: string, iteration: ProgressIteration): Promise<StateDistricts> {
  try {
    const stateDistricts = districts.find((val: any) => val.state === stateName) as any;
    stateDistricts.districts = stateDistricts?.districts.map((val: any) => ({
      names: [val.name],
      wikipedia_page: val.wikipedia_page,
      states_union_territories: stateDistricts.name_id,
    }));

    logProgress(
      {
        message: "DISTRICTS: names, wikipedia_page, states_union_territories",
        data: stateDistricts,
        key: "STATE_DISTRICTS_LIST",
      },
      "SUCCESS",
      iteration
    );
    return stateDistricts;
  } catch (e) {
    logProgress(
      {
        message: "DISTRICTS: names, wikipedia_page, states_union_territories",
        data: {},
        key: "STATE_DISTRICTS_LIST",
      },
      "FAILURE",
      iteration
    );
    throw e;
  }
}

async function fetchStateOSMData(stateDistricts: StateDistricts, iteration: ProgressIteration): Promise<StateOSMData> {
  const graphQLClient = await createGraphQLClient();
  try {
    const stateDetails = await queryNodeType("_Indian_State_Union_Territory_", graphQLClient, stateDistricts.name_id, [
      "osm_id",
      "id",
      "regions { geo_boundary { source_data } } ",
    ]);
    const stateOSMData: any = JSON.parse(stateDetails[0].regions[0].geo_boundary[0].source_data);

    const relevantData = {
      osm_id: stateDetails[0].osm_id,
      id: stateDetails[0].id,
      state_osm_data: { localname: stateOSMData.localname, admin_level: stateOSMData.admin_level },
    };

    logProgress(
      {
        message: "FETCHED STATE OSM DATA",
        data: relevantData,
        key: "STATE_OSM_DATA",
      },
      "SUCCESS",
      iteration
    );
    return relevantData;
  } catch (e) {
    logProgress(
      {
        message: "FETCHED STATE OSM DATA",
        data: {},
        key: "STATE_OSM_DATA",
      },
      "FAILURE",
      iteration
    );
    throw e;
  }
}

async function fetchDistrictsOSMRelationIds(stateOSMData: StateOSMData, iteration: ProgressIteration): Promise<any> {
  try {
    const districtsOSMList = await fetchDistrictsForState(
      stateOSMData.state_osm_data.localname,
      stateOSMData.state_osm_data.admin_level.toString(),
      5
    );

    logProgress(
      {
        message: "FETCHED DISTRICTS RELATION IDS",
        data: {
          districtsRelationIds: districtsOSMList.elements,
        },
        key: "STATE_DISTRICTS_OSM_RELATION_IDS",
      },
      "SUCCESS",
      iteration
    );
    return {
      districtsRelationIds: districtsOSMList.elements,
    };
  } catch (e) {
    logProgress(
      {
        message: "FETCHED DISTRICTS RELATION IDS",
        data: {},
        key: "STATE_DISTRICTS_OSM_RELATION_IDS",
      },
      "FAILURE",
      iteration
    );
    throw e;
  }
}

async function fetchDistrictsOSMDetails(districtsOSMList: any, iteration: ProgressIteration): Promise<any[]> {
  let districtsOSMDetails: any[] = [];
  let districtsOSMDetailsStepSuccessStatus: "SUCCESS" | "PARTIAL" | "FAILURE" = "SUCCESS";

  try {
    for (let osmd of districtsOSMList.districtsRelationIds) {
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

    logProgress(
      {
        message: "FETCHED DISTRICT OSM DETAILS",
        data: {
          districtsOSMDetails,
        },
        key: "STATE_DISTRICTS_OSM_DATA",
      },
      districtsOSMDetailsStepSuccessStatus,
      iteration
    );
    return districtsOSMDetails;
  } catch (e) {
    logProgress(
      {
        message: "FETCHED DISTRICT OSM DETAILS",
        data: {
          districtsOSMDetails,
          error: e,
        },
        key: "STATE_DISTRICTS_OSM_DATA",
      },
      "FAILURE",
      iteration
    );
    throw e;
  }
}

async function fetchDistrictsWikiDetails(stateDistricts: StateDistricts, iteration: ProgressIteration): Promise<any[]> {
  try {
    const urls = map(stateDistricts.districts, (val) => val.wikipedia_page);
    const results = await processListOfWikipediaPages(urls);

    logProgress(
      {
        message: "FETCHED DISTRICT WIKI DETAILS",
        data: {
          districtsWikiDetails: results,
        },
        key: "STATE_DISTRICTS_WIKI_DATA",
      },
      "SUCCESS",
      iteration
    );
    return results;
  } catch (e) {
    logProgress(
      {
        message: "FETCHED DISTRICT WIKI DETAILS",
        data: {},
        key: "STATE_DISTRICTS_WIKI_DATA",
      },
      "FAILURE",
      iteration
    );
    throw e;
  }
}

async function fetchDistrictSOIGeoFeatures(stateName: string, iteration: ProgressIteration): Promise<GeoJSONFeature[]> {
  try {
    const districtFeaturesSOI = (districtsGeoSOI as GeoJSON)?.features?.filter(
      (dist) => dist.properties.stname.toLowerCase() === stateName
    );
    if (districtFeaturesSOI.length) {
      logProgress(
        {
          message: "FETCHED DISTRICT SOI GEO FEATURES",
          data: districtFeaturesSOI,
          key: "STATE_DISTRICTS_SOI_GEO_DATA",
        },
        "SUCCESS",
        iteration
      );
      return districtFeaturesSOI;
    } else {
      throw new Error("No SOI geo features found");
    }
  } catch (e) {
    logProgress(
      {
        message: "FETCHED DISTRICT SOI GEO FEATURES",
        data: {},
        key: "STATE_DISTRICTS_SOI_GEO_DATA",
      },
      "FAILURE",
      iteration
    );
    throw e;
  }
}

function transformDistrictsWikipediaData(
  districtsWikiDetails: WikiDistrictResult[],
  stateDistricts: StateDistricts,
  iteration: ProgressIteration
): DistrictsTransformationWikidata[] {
  const keyedDistricts: Record<string, District> = keyBy(stateDistricts.districts, "wikipedia_page");
  const transformedDistricts: DistrictsTransformationWikidata[] = [];
  const missingUrls: string[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  districtsWikiDetails.forEach((wikiDistrict: WikiDistrictResult) => {
    if (!keyedDistricts[wikiDistrict.url]) {
      missingUrls.push(wikiDistrict.url);
      status = "PARTIAL";
    } else {
      if (wikiDistrict.results.wikidata_qid) {
        transformedDistricts.push({
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

  logProgress(
    {
      message: `Districts matched and transformed with ${status}`,
      data: { keyedDistricts, missingUrls, transformedDistricts },
      key: `WIKIPEDIA_MATCH_STEP_${status}`,
    },
    status,
    iteration
  );

  return transformedDistricts;
}

function transformDistrictsWithOSM(
  districtsOSMDetails: any[],
  districtsWithWikidata: DistrictsTransformationWikidata[],
  iteration: ProgressIteration
): DistrictsTransformationOSM[] {
  const transformedDistricts: DistrictsTransformationOSM[] = [];
  const unmatchedDistricts: DistrictsTransformationWikidata[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  districtsWithWikidata.forEach((district) => {
    const matchedOSMDetail = districtsOSMDetails.find((osmDetail) => {
      const localnameMatch = osmDetail.localname === district.names[0];
      const wikidataMatch = osmDetail.extratags?.wikidata === district.wikidata_qid;
      return localnameMatch || wikidataMatch;
    });

    if (matchedOSMDetail) {
      const localnameMatch = matchedOSMDetail.localname === district.names[0];
      const wikidataMatch = matchedOSMDetail.extratags?.wikidata === district.wikidata_qid;
      const matchQuality = localnameMatch && wikidataMatch ? "100%" : "50%";

      transformedDistricts.push({
        ...district,
        osm_id: matchedOSMDetail.osm_id.toString(),
        match_quality: matchQuality,
      });
    } else {
      unmatchedDistricts.push(district);
      status = "PARTIAL";
    }
  });

  logProgress(
    {
      message: `Districts transformed with OSM data with ${status}`,
      data: { unmatchedDistricts, transformedDistricts },
      key: `OSM_TRANSFORMATION_STEP_${status}`,
    },
    status,
    iteration
  );

  return transformedDistricts;
}

function transformDistrictsWithSOIGeo(
  districtsGeoSOI: GeoJSONFeature[],
  districtsWithOSM: DistrictsTransformationOSM[],
  stateName: string,
  iteration: ProgressIteration
): DistrictsTransformationSOIGeo[] {
  const transformedDistricts: DistrictsTransformationSOIGeo[] = [];
  const unmatchedDistricts: DistrictsTransformationOSM[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  // Filter districtsGeoSOI for the given state
  const stateDistrictsGeoSOI = districtsGeoSOI.filter(
    (feature) => feature.properties.stname.toLowerCase() === stateName.toLowerCase()
  );

  districtsWithOSM.forEach((district) => {
    const matchedGeoDetail = stateDistrictsGeoSOI.find(
      (geoDetail) => geoDetail.properties.dtname.toLowerCase() === district.names[0].toLowerCase()
    );

    if (matchedGeoDetail) {
      transformedDistricts.push({
        ...district,
        geo_soi: matchedGeoDetail,
      });
    } else {
      unmatchedDistricts.push(district);
      status = "PARTIAL";
    }
  });

  logProgress(
    {
      message: `Districts transformed with Geo data with ${status}`,
      data: { unmatchedDistricts, transformedDistricts },
      key: `GEO_TRANSFORMATION_STEP_${status}`,
    },
    status,
    iteration
  );

  return transformedDistricts;
}

(async () => {
  initializeDirectories();
  const stateName = "andaman and nicobar islands";
  console.log("DISTRICTS PROCESSING INITIALIZED: ", stateName);

  const iteration = getCurrentIteration();

  try {
    const stateDistricts = await fetchStateDistricts(stateName, iteration);

    const stateOSMData = await fetchStateOSMData(stateDistricts, iteration);
    const districtsOSMList = await fetchDistrictsOSMRelationIds(stateOSMData, iteration);

    const districtsWikiDetails = await fetchDistrictsWikiDetails(stateDistricts, iteration);
    const districtsWithWikidata = transformDistrictsWikipediaData(districtsWikiDetails, stateDistricts, iteration);

    const districtsOSMDetails = await fetchDistrictsOSMDetails(districtsOSMList, iteration);
    const districtsWithOSM = transformDistrictsWithOSM(districtsOSMDetails, districtsWithWikidata, iteration);

    const districtsWithGeo = transformDistrictsWithSOIGeo(
      districtsGeoSOI.features,
      districtsWithOSM,
      stateName,
      iteration
    );

    console.log(JSON.stringify(districtsWithGeo));
  } catch (error) {
    console.error("Error in processing: ", error);
  }
})();

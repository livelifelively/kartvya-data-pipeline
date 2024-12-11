import path from "path";
import fs from "fs";
import { map } from "lodash";
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
  sut: { name_id: string }[];
  districts: District[];
}

interface ProgressData {
  message: string;
  data: any;
  key: string;
  timeStamp?: Date;
}

interface ProgressStatus {
  logFile: string;
  status: "SUCCESS" | "FAILURE" | "PARTIAL";
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

const progressStatusFile = path.join(__dirname, "logs", "progressStatus.json");
const districtsProgressDir = path.join(__dirname, "distrit-progress-logs");

function initializeDirectories(): void {
  fs.mkdirSync(districtsProgressDir, { recursive: true });
  fs.mkdirSync(path.dirname(progressStatusFile), { recursive: true });
  if (!fs.existsSync(progressStatusFile)) {
    fs.writeFileSync(progressStatusFile, JSON.stringify([]));
  }
}

function logProgress(progressData: ProgressData, status: "SUCCESS" | "FAILURE" | "PARTIAL"): void {
  const progressStatus: ProgressStatus[] = JSON.parse(fs.readFileSync(progressStatusFile, "utf8"));
  const progressDataLogFile = path.join(districtsProgressDir, `${progressStatus.length}.${progressData.key}.log.json`);

  progressStatus.push({
    logFile: progressDataLogFile,
    status,
  });

  let existingLogs: ProgressData[] = [];
  if (fs.existsSync(progressDataLogFile)) {
    existingLogs = JSON.parse(fs.readFileSync(progressDataLogFile, "utf8"));
  }

  existingLogs.push({ ...progressData, timeStamp: new Date() });
  fs.writeFileSync(progressDataLogFile, JSON.stringify(existingLogs, null, 2));
  fs.writeFileSync(progressStatusFile, JSON.stringify(progressStatus, null, 2));

  console.log(
    progressStatus.map((val, index) => ({
      step: index,
      ...val,
    }))
  );
}

async function fetchStateDistricts(stateName: string): Promise<StateDistricts> {
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
      "SUCCESS"
    );
    return stateDistricts;
  } catch (e) {
    logProgress(
      {
        message: "DISTRICTS: names, wikipedia_page, states_union_territories",
        data: {},
        key: "STATE_DISTRICTS_LIST",
      },
      "FAILURE"
    );
    throw e;
  }
}

async function fetchStateOSMData(stateDistricts: StateDistricts): Promise<OSMData> {
  const graphQLClient = await createGraphQLClient();
  try {
    const stateDetails = await queryNodeType(
      "_Indian_State_Union_Territory_",
      graphQLClient,
      stateDistricts.sut[0].name_id,
      ["osm_id", "id", "regions { geo_boundary { source_data } } "]
    );
    const stateOSMData = JSON.parse(stateDetails[0].regions[0].geo_boundary[0].source_data) as OSMData;

    logProgress(
      {
        message: "FETCHED STATE OSM DATA",
        data: {
          osm_id: stateDetails[0].osm_id,
          id: stateDetails[0].id,
          state_osm_data: { localname: stateOSMData.localname, admin_level: stateOSMData.admin_level },
        },
        key: "STATE_OSM_DATA",
      },
      "SUCCESS"
    );
    return stateOSMData;
  } catch (e) {
    logProgress(
      {
        message: "FETCHED STATE OSM DATA",
        data: {},
        key: "STATE_OSM_DATA",
      },
      "FAILURE"
    );
    throw e;
  }
}

async function fetchDistrictsOSMRelationIds(stateOSMData: OSMData): Promise<any> {
  try {
    const districtsOSMList = await fetchDistrictsForState(
      stateOSMData.localname,
      stateOSMData.admin_level.toString(),
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
      "SUCCESS"
    );
    return districtsOSMList;
  } catch (e) {
    logProgress(
      {
        message: "FETCHED DISTRICTS RELATION IDS",
        data: {},
        key: "STATE_DISTRICTS_OSM_RELATION_IDS",
      },
      "FAILURE"
    );
    throw e;
  }
}

async function fetchDistrictsOSMDetails(districtsOSMList: any): Promise<any[]> {
  let districtsOSMDetails: any[] = [];
  let districtsOSMDetailsStepSuccessStatus: "SUCCESS" | "PARTIAL" = "SUCCESS";
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
      districtsOSMDetailsStepSuccessStatus
    );
    return districtsOSMDetails;
  } catch (e) {
    logProgress(
      {
        message: "FETCHED DISTRICT OSM DETAILS",
        data: {},
        key: "STATE_DISTRICTS_OSM_DATA",
      },
      "FAILURE"
    );
    throw e;
  }
}

async function fetchDistrictsWikiDetails(stateDistricts: StateDistricts): Promise<any[]> {
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
      "SUCCESS"
    );
    return results;
  } catch (e) {
    logProgress(
      {
        message: "FETCHED DISTRICT WIKI DETAILS",
        data: {},
        key: "STATE_DISTRICTS_WIKI_DATA",
      },
      "FAILURE"
    );
    throw e;
  }
}

async function fetchDistrictSOIGeoFeatures(stateName: string): Promise<GeoJSONFeature[]> {
  try {
    const districtFeaturesSOI = (districtsGeoSOI as any)?.features?.filter(
      (dist: any) => dist.properties.stname.toLowerCase() === stateName
    );
    if (districtFeaturesSOI.length) {
      logProgress(
        {
          message: "FETCHED DISTRICT SOI GEO FEATURES",
          data: districtFeaturesSOI,
          key: "STATE_DISTRICTS_SOI_GEO_DATA",
        },
        "SUCCESS"
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
      "FAILURE"
    );
    throw e;
  }
}

(async () => {
  initializeDirectories();
  const stateName = "andaman and nicobar islands";
  console.log("DISTRICTS PROCESSING INITIALIZED: ", stateName);

  try {
    const stateDistricts = await fetchStateDistricts(stateName);
    // const stateOSMData = await fetchStateOSMData(stateDistricts);
    // const districtsOSMList = await fetchDistrictsOSMRelationIds(stateOSMData);
    // const districtsOSMDetails = await fetchDistrictsOSMDetails(districtsOSMList);
    // const districtsWikiDetails = await fetchDistrictsWikiDetails(stateDistricts);
    // const districtSOIGeoFeatures = await fetchDistrictSOIGeoFeatures(stateName);

    // Further processing can be done here with the fetched data
  } catch (error) {
    console.error("Error in processing: ", error);
  }
})();

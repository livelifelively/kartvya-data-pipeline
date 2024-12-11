// states_union_territories: [_Indian_State_Union_Territory_] @hasInverse(field: "districts")
// sub_districts: [_Indian_Sub_District_] @hasInverse(field: "districts")
// loksabha_constituencies: [_Indian_Loksabha_Constituency_] @hasInverse(field: "districts")
// vidhansabha_constituencies: [_Indian_Vidhansabha_Constituency_] @hasInverse(field: "districts")
// regions: [_Indian_District_Region_] @hasInverse(field: "self")
// wikidata_qid: String @search(by: [hash])
// osm_id: String @search(by: [hash])

import { districts } from "../../../districts/all-states-districts-list";
import { queryNodeType } from "../../../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../../../knowledge-graph/generic/generic.utils";
import { fetchByRelationId, fetchDistrictsForState } from "../../../../maps/india-osm/states.fetch-geojsons";
import districtsGeoSOI from "../../../districts/india.d.geojson";

import path from "path";
import fs from "fs";
import { map } from "lodash";
import { processListOfWikipediaPages } from "../../../districts/extract-district-page-data";

let districtsProgressDir = path.join(__dirname, "distrit-progress-logs");
fs.mkdirSync(districtsProgressDir, { recursive: true });

// current status of the process and meta data
const progressStatus: any = [];

function logProgress(progressData: any, status: "SUCCESS" | "FAILURE" | "PARTIAL") {
  let existingLogs: any = [];
  const progressDataLogFile = path.join(districtsProgressDir, `${progressStatus.length}.${progressData.key}.log.json`);

  progressStatus.push({
    logFile: progressDataLogFile,
    status,
  });

  if (fs.existsSync(progressDataLogFile)) {
    existingLogs = fs.readFileSync(progressDataLogFile, "utf8");
  }

  existingLogs.push({ ...progressData, timeStamp: new Date() });
  fs.writeFileSync(progressDataLogFile, JSON.stringify(existingLogs, null, 2));

  console.log(
    progressStatus.map((val: any, index: any) => {
      return {
        step: index,
        ...val,
      };
    })
  );
}

async function fetchDetailsFromWikipediaUrls(districtsList: any) {
  const urls = map(districtsList, (val) => val.wikipedia_page);
  //   const outputFilePath = path.join(__dirname, "d-data.json");
  let results = await processListOfWikipediaPages(urls);

  //   fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2));

  return results;
}

(async () => {
  const stateName = "andaman and nicobar islands";
  console.log("DISTRICTS PROCESSING INITIALIZED: ", stateName);
  let stateDistricts: any = {};
  try {
    stateDistricts = districts.find((val: any) => val.state === stateName);
    stateDistricts.districts = stateDistricts?.districts.map((val: any) => {
      return {
        names: [val.name],
        wikipedia_page: val.wikipedia_page,
        states_union_territories: stateDistricts.name_id,
      };
    });

    logProgress(
      {
        message: "DISTRICTS: names, wikipedia_page, states_union_territories",
        data: stateDistricts,
        key: "STATE_DISTRICTS_LIST",
      },
      "SUCCESS"
    );
  } catch (e) {
    logProgress(
      {
        message: "DISTRICTS: names, wikipedia_page, states_union_territories",
        data: stateDistricts,
        key: "STATE_DISTRICTS_LIST",
      },
      "FAILURE"
    );
  }

  const graphQLClient = await createGraphQLClient();
  let stateOSMData: any = {};
  try {
    const stateDetails = await queryNodeType("_Indian_State_Union_Territory_", graphQLClient, stateDistricts.name_id, [
      "osm_id",
      "id",
      "regions { geo_boundary { source_data } } ",
    ]);
    stateOSMData = JSON.parse(stateDetails[0].regions[0].geo_boundary[0].source_data);

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
  } catch (e) {
    logProgress(
      {
        message: "FETCHED STATE OSM DATA",
        data: {},
        key: "STATE_OSM_DATA",
      },
      "FAILURE"
    );
  }

  let districtsOSMList: any = [];
  try {
    districtsOSMList = await fetchDistrictsForState(stateOSMData.localname, stateOSMData.admin_level.toString(), 5);

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
  } catch (e) {
    logProgress(
      {
        message: "FETCHED DISTRICTS RELATION IDS",
        data: {},
        key: "STATE_DISTRICTS_OSM_RELATION_IDS",
      },
      "FAILURE"
    );
  }

  let districtsOSMDetails: any = [];
  let districtsOSMDetailsStepSuccessStatus: any = "SUCCESS";
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
  } catch (e) {
    logProgress(
      {
        message: "FETCHED DISTRICT OSM DETAILS",
        data: {},
        key: "STATE_DISTRICTS_OSM_DATA",
      },
      "FAILURE"
    );
  }

  let districtsWikiDetails: any = [];
  try {
    districtsWikiDetails = await fetchDetailsFromWikipediaUrls(stateDistricts.districts);

    logProgress(
      {
        message: "FETCHED DISTRICT WIKI DETAILS",
        data: {
          districtsWikiDetails,
        },
        key: "STATE_DISTRICTS_WIKI_DATA",
      },
      "SUCCESS"
    );
  } catch (e) {
    logProgress(
      {
        message: "FETCHED DISTRICT WIKI DETAILS",
        data: {},
        key: "STATE_DISTRICTS_WIKI_DATA",
      },
      "FAILURE"
    );
  }

  let districtFeaturesSOI = districtsGeoSOI?.features?.filter((dist: any) => {
    return dist.properties.stname.toLowerCase === stateName;
  });
  if (districtFeaturesSOI.length) {
    logProgress(
      {
        message: "FETCHED DISTRICT SOI GEO FEATURES",
        data: districtFeaturesSOI,
        key: "STATE_DISTRICTS_SOI_GEO_DATA",
      },
      "SUCCESS"
    );
  } else {
    logProgress(
      {
        message: "FETCHED DISTRICT SOI GEO FEATURES",
        data: {},
        key: "STATE_DISTRICTS_SOI_GEO_DATA",
      },
      "FAILURE"
    );
  }

  // stateDistricts.districts
  // for every district assemble the data from all the sources
  // JSON.stringify(districtsOSMDetails);
})();

/**
 * 1. get state osm id
 * 2. get geo from OSM
 */
// get state osm id
// fetch all districts in it
// check for duplicate name districts
// check for osm-district name in our districts
// make up for missing districts
// fetch district geo from OSM

/**
 * 3. get wikidata id
 */
// for the list of all urls
// fetch latest wikipedia pages and wikidata qids

/**
 * 4. get geo from SOI
 */

// create names - DONE
// create district
// create geo
// create region

// console.log(stateDistricts);

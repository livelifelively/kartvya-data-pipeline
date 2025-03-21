import path from "path";
import fs from "fs";
import { groupBy, keyBy, map, reduce, size } from "lodash";
import { createGraphQLClient } from "../knowledge-graph/generic/generic.utils";
import { createNodeType, queryNodeType } from "../knowledge-graph/generic/generic.create";
import { fetchByRelationId, fetchDistrictsOSMRelationIdsForState } from "../maps/india-osm/states.fetch-geojsons";
import { processListOfWikipediaPages } from "../admin-regions/districts-old/extract-district-page-data";
import { generateNameId } from "../knowledge-graph/region-names/region-names.utils";

import { upsert_Name_ } from "../knowledge-graph/name/name.update";
import { runPipeline } from "./pipeline";
import { multiPolygonToDgraphMultiPolygon, polygonToMultiPolygon } from "./pipeline-utils";

interface District {
  names: string[];
  wikipedia_page: string;
  states_union_territories: string;
}

interface StateUT {
  state: string;
  name_id: string;
  vehicleCode: string;
  // districts: District[];
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
  urls: string[];
  results?: {
    infobox?: any;
    wikidata_qid?: string;
    wikipedia_page?: string;
    last_updated_on?: string;
  };
}

interface DistrictsTransformationWikidata extends District {
  name_id: string;
  id_url: string[];
  wikidata_qid: string;
  wikipedia_page: string;
}

interface DistrictsTransformationOSM extends DistrictsTransformationWikidata {
  osm_id: string;
  // match_quality: "100%" | "50%";
  localnameMatch: Boolean;
  wikidataMatch: Boolean;
  geo_osm: any;
  osm_localname?: string;
  osm_wikidata_qid?: string;
  calculated_wikipedia?: string;
}

interface DistrictsTransformationSOIGeo extends DistrictsTransformationOSM {
  geo_soi: any;
}

export interface PipelineStep {
  name: string;
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

export async function fetchStateDistricts(outputs: Record<string, any>): Promise<any> {
  const { stateUT, districtsList } = outputs;

  try {
    const districts = districtsList.map((val: any) => ({
      names: val.names,
      wikipedia_page: val.wikipedia_page,
      states_union_territories: stateUT.name_id,
    }));

    return { districts, districtsCount: districts.length, status: "SUCCESS" };
  } catch (e) {
    throw e;
  }
}

export async function fetchStateOSMData(outputs: Record<string, any>): Promise<any> {
  const { stateUT } = outputs;
  const graphQLClient = await createGraphQLClient();

  try {
    const stateDetails = await queryNodeType(
      "_Indian_State_Union_Territory_Version_Region_",
      graphQLClient,
      `${stateUT.name_id}-version-25-region`,
      ["osm_id", "id", "geo_boundary { source { source_data } }"]
    );
    const stateOSMData: any = JSON.parse(stateDetails[0].geo_boundary[0].source.source_data);

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

export async function fetchDistrictsOSMRelationIds(outputs: Record<string, any>): Promise<any> {
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

export async function fetchDistrictsOSMDetails(outputs: Record<string, any>): Promise<any> {
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

export async function fetchDistrictsWikiDetails(outputs: Record<string, any>): Promise<any> {
  const { districts } = outputs;
  let status: "SUCCESS" | "PARTIAL" | "FAILURE" = "SUCCESS";
  try {
    const urls = map(districts, (val) => val.wikipedia_page);
    const { success, failure } = await processListOfWikipediaPages(urls);

    if (failure.length) status = "PARTIAL";

    let keyedSuccessfulResults: Record<string, any[]> = groupBy(success, "results.wikipedia_page");

    // merge urls
    keyedSuccessfulResults = reduce(
      keyedSuccessfulResults,
      (agg: any, val: any, idx: any) => {
        agg[idx] = val.reduce((agg1: any, val1: any) => {
          agg1.urls = agg1.urls || [];
          agg1.urls.push(val1.url);

          agg1 = {
            ...val1,
            ...agg1,
          };

          return agg1;
        }, {});
        return agg;
      },
      {}
    );

    return { districtsWikiDetails: Object.values(keyedSuccessfulResults), districtsWikiDetailsFailed: failure, status };
  } catch (e) {
    throw e;
  }
}

export async function fetchDistrictSOIGeoFeatures(outputs: Record<string, any>): Promise<any> {
  const { stateUT, progressDir, districtsCount } = outputs;

  const geojsonFile = path.join(progressDir, "../d.geo.json");
  let districtsGeoSOI: any;
  if (fs.existsSync(geojsonFile)) {
    districtsGeoSOI = JSON.parse(fs.readFileSync(geojsonFile, "utf8"));
  } else {
    throw new Error("Geojson file not found!");
  }

  try {
    const districtFeaturesSOI = districtsGeoSOI?.filter(
      (dist: any) => dist.properties.stname.toLowerCase() === stateUT.name.toLowerCase()
    );

    if (districtFeaturesSOI?.length) {
      if (districtsCount === districtFeaturesSOI?.length) {
        return {
          districtFeaturesSOI,
          status: "SUCCESS",
          districtFeaturesSOIDistrictsCount: districtFeaturesSOI.length,
        };
      }
      return { districtFeaturesSOI, status: "PARTIAL", districtFeaturesSOIDistrictsCount: districtFeaturesSOI.length };
    } else {
      return { status: "FAILURE", error: "NO DISTRICTS FEATURES FOUND IN SOI DATA" };
    }
  } catch (e) {
    throw e;
  }
}

export async function transformDistrictsWikipediaData(outputs: Record<string, any>): Promise<any> {
  const { districtsWikiDetails, stateUT, districts } = outputs;

  const keyedDistricts: Record<string, District> = keyBy(districts, "wikipedia_page");
  const transformedDistrictsWikipedia: DistrictsTransformationWikidata[] = [];
  const missingUrls: string[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  districtsWikiDetails.forEach((wikiDistrict: WikiDistrictResult) => {
    if (!keyedDistricts[wikiDistrict.urls[0]]) {
      missingUrls.push(wikiDistrict.urls[0]);
      status = "PARTIAL";
    } else {
      if (wikiDistrict.results?.wikidata_qid) {
        transformedDistrictsWikipedia.push({
          ...keyedDistricts[wikiDistrict.urls[0]],
          name_id: generateNameId(
            `in-d-${stateUT.vehicle_code.toLowerCase()}-`,
            keyedDistricts[wikiDistrict.urls[0]].names[0]
          ),
          wikidata_qid: wikiDistrict.results?.wikidata_qid,
          id_url: wikiDistrict.urls,
        });

        delete keyedDistricts[wikiDistrict.urls[0]];
      }
    }
  });

  if (size(keyedDistricts)) {
    status = "PARTIAL";
  }

  return { transformedDistrictsWikipedia, districtsNotTransformedWikipedia: Object.values(keyedDistricts), status };
}

export async function transformDistrictsWithOSM(outputs: Record<string, any>): Promise<any> {
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
      const wikidataMatch = matchedOSMDetail.extratags?.wikidata === district.wikidata_qid;
      const localnameMatch = district.names.includes(matchedOSMDetail.localname);
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
        let partiallyMatchedVal: DistrictsTransformationOSM = {
          ...district,
          names: district.names.concat(matchedOSMDetail.localname),
          osm_id: matchedOSMDetail.osm_id.toString(),
          localnameMatch,
          wikidataMatch,
          geo_osm: matchedOSMDetail,
        };

        // if urls match as well, simply push to names
        if (
          matchedOSMDetail.calculated_wikipedia ===
          `en:${partiallyMatchedVal.wikipedia_page.split("https://en.wikipedia.org/wiki/")[1]}`
        ) {
          // status = "SUCCESS";
          // push name to names array
          partiallyMatchedVal.names.push(matchedOSMDetail.localname);
          fullMatchDistrictsOSMWiki.push(partiallyMatchedVal);
        } else {
          partiallyMatchedVal = {
            ...partiallyMatchedVal,
            osm_localname: matchedOSMDetail.localname,
            osm_wikidata_qid: matchedOSMDetail.extratags?.wikidata,
            calculated_wikipedia: matchedOSMDetail.calculated_wikipedia,
          };

          partialMatchDistrictsOSMWiki.push(partiallyMatchedVal);
          // status = "PARTIAL";
        }
      }
    } else {
      unmatchedDistricts.push(district);
    }
  });

  if (unmatchedDistricts.length > 0 || partialMatchDistrictsOSMWiki.length > 0) status = "PARTIAL";

  return {
    // fullMatchDistrictsOSMWiki,
    // partialMatchDistrictsOSMWiki,
    allMatchedDistrictsOSMWiki: [...fullMatchDistrictsOSMWiki, ...partialMatchDistrictsOSMWiki],
    matchDistrictsOSMWikiStatistics: {
      fullMatched: fullMatchDistrictsOSMWiki.length,
      partialMatched: partialMatchDistrictsOSMWiki.length,
      partialMatchesBrief: partialMatchDistrictsOSMWiki.map((val) => {
        return {
          name_id: val.name_id,
          id_url: val.id_url,
          wikidata_qid: val.wikidata_qid,
          wikipedia_page: val.wikipedia_page,
          localnameMatch: val.localnameMatch,
          wikidataMatch: val.wikidataMatch,
          osm_localname: val.osm_localname,
          osm_wikidata_qid: val.osm_wikidata_qid,
          calculated_wikipedia: val.calculated_wikipedia,
        };
      }),
      unmatched: unmatchedDistricts.length,
    },
    unmatchedDistrictsOSMWiki: unmatchedDistricts,
    status,
  };
}

export async function transformDistrictsWithSOIGeo(outputs: Record<string, any>): Promise<any> {
  const { districtFeaturesSOI, allMatchedDistrictsOSMWiki } = outputs;

  const transformedDistrictsSOIGeo: DistrictsTransformationSOIGeo[] = [];
  const unmatchedDistricts: any[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

  // if (districtFeaturesSOI.length !== allMatchedDistrictsOSMWiki.length) {
  //   return {
  //     status: "FAILURE",
  //     error: "DISTRICTS COUNT MISMATCH. DATA MAY NOT BE SUITABLE FOR USAGE.",
  //   };
  // }

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

  if (unmatchedDistricts.length > 0) status = "PARTIAL";

  return {
    transformedDistrictsSOIGeo: [...transformedDistrictsSOIGeo, ...unmatchedDistricts],
    // unmatchedDistrictsSOIGeo: unmatchedDistricts,
    matchDistrictsSOIOSMWikiStatistics: {
      unmatchedDistrictsBrief: unmatchedDistricts.map((val) => {
        return {
          name_id: val.name_id,
          names: val.names,
          id_url: val.id_url,
          wikidata_qid: val.wikidata_qid,
          wikipedia_page: val.wikipedia_page,
          localnameMatch: val.localnameMatch,
          wikidataMatch: val.wikidataMatch,
          osm_localname: val.osm_localname,
          osm_wikidata_qid: val.osm_wikidata_qid,
          calculated_wikipedia: val.calculated_wikipedia,
        };
      }),
    },
    unmatchedCount: unmatchedDistricts.length,
    status,
  };
}

export async function addDistrictDataToKnowledgeGraph(outputs: Record<string, any>) {
  // const { transformedDistrictsSOIGeo } = outputs;
  const { allMatchedDistrictsOSMWiki } = outputs;
  const graphQLClient = await createGraphQLClient();

  let savedToKnowledgeGraph: any = [];
  // for (let td of transformedDistrictsSOIGeo) {
  for (let td of allMatchedDistrictsOSMWiki) {
    let toSaveDistrict: any = {
      name_id: td.name_id,
      names: td.names.map((val: any) => {
        return {
          name: val,
        };
      }),

      wikipedia_page: td.wikipedia_page,
      wikidata_qid: td.wikidata_qid,

      node_created_on: new Date(),
    };

    let toSaveDistrictRegion: any = {};

    let geo_osm, geo_soi;
    let geoOSMId, geoSOIId, geoSourceId;

    if (td.geo_osm) {
      const districtMapOSM = polygonToMultiPolygon(td.geo_osm);

      geoSourceId = await createNodeType("_Source_Data_", graphQLClient, {
        source: { name_id: "OpenStreetMap" },
        source_url: `https://nominatim.openstreetmap.org/details.php?osmtype=R&osmid=${td.osm_id}&class=boundary&addressdetails=1&hierarchy=0&group_hierarchy=1&polygon_geojson=1&format=json`,
        source_data: `${JSON.stringify(td.geo_osm)}`,
      });

      geoOSMId = await createNodeType("_Geo_", graphQLClient, {
        category: "Region",
        area: multiPolygonToDgraphMultiPolygon(districtMapOSM.geometry.coordinates),
        node_created_on: new Date(),
        source: { id: geoSourceId },
      });
    }

    if (td.osm_id) toSaveDistrictRegion.osm_id = td.osm_id;

    toSaveDistrictRegion = {
      name_id: `${td.name_id}-version-25-region`,
      // self: { name_id: toSaveDistrict.name_id },
      // version: { id: districtVersionId },
      geo_boundary: [],
      states_union_territories: [{ name_id: `${td.states_union_territories}-version-25-region` }],
      node_created_on: new Date(),
    };

    if (geoOSMId) {
      toSaveDistrictRegion.geo_boundary.push({ id: geoOSMId });
    }

    // if (geoSOIId) {
    //   toSaveDistrictRegion.geo_boundary.push({ id: geoSOIId });
    // }

    // if (td.geo_soi) {
    //   const districtMapSOI = polygonToMultiPolygon(td.geo_soi);
    //   geo_soi = {
    //     category: "Region",
    //     area: multiPolygonToDgraphMultiPolygon(districtMapSOI.geometry.coordinates),
    //     source_name: "Survey of India",
    //     source_url: `https://onlinemaps.surveyofindia.gov.in/`,
    //     source_data: `${JSON.stringify(td.geo_soi)}`,
    //   };
    //   geoSOIId = await createNodeType("_Geo_", graphQLClient, geo_soi);
    // }

    const districtRegionId = await createNodeType(
      "_Indian_District_Version_Region_",
      graphQLClient,
      toSaveDistrictRegion
    );

    let toSaveDistrictVersion: any = {
      name_id: `${td.name_id}-version-25`,
      region: { id: districtRegionId },
    };

    const districtVersionId = await createNodeType("_Indian_District_Version_", graphQLClient, toSaveDistrictVersion);

    let nameIds: any = [];
    for (let n of toSaveDistrict.names) {
      const nameId = await upsert_Name_(n.name);
      nameIds.push({ id: nameId });
    }

    toSaveDistrict.active_version = { id: districtVersionId };
    toSaveDistrict.versions = [{ id: districtVersionId }];
    toSaveDistrict.regions = [{ id: districtRegionId }];

    const districtId = await createNodeType("_Indian_District_", graphQLClient, toSaveDistrict);

    savedToKnowledgeGraph.push({
      names: nameIds,
      district: {
        districtId,
        toSaveDistrict,
      },
      districtVersion: {
        districtVersionId,
      },
      districtRegion: {
        districtRegionId,
        toSaveDistrictRegion,
      },
      geo: {
        geo_osm: geo_osm ? { geo_osm, geoOSMId } : null,
        // geo_soi: geo_soi ? { geo_soi, geoSOIId } : null,
      },
      id_url: td.id_url,
      name_id: td.name_id,
    });

    console.log({
      nameIds,
      districtId,
      districtRegionId,
      id_url: td.id_url,
      name_id: td.name_id,
    });
  }

  return { savedToKnowledgeGraph, status: "SUCCESS" };
}

async function sampleFunction(stateUT: any) {
  // const stateUT = { name: "andaman and nicobar islands", region_id: "in-sut-andaman-nicobar-islands" };
  console.log("DISTRICTS PROCESSING INITIALIZED: ", stateUT.name);

  const steps: PipelineStep[] = [
    {
      name: "Fetch State Districts",
      function: fetchStateDistricts,
      key: "STATE_DISTRICTS_LIST",
      input: null,
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
      input: null,
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
    // {
    //   name: "Save Districts to KnowledgeGraph",
    //   function: addDistrictDataToKnowledgeGraph,
    //   input: null,
    //   key: "SAVE_DISTRICT_DATA_TO_KNOWLEDGE_GRAPH",
    // },
  ];

  let outputs: Record<string, any> = {
    stateUT: {},
    districtsList: [],
    districtsCount: 0,
    districts: [],
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
    matchDistrictsOSMWikiStatistics: {},
    unmatchedDistrictsOSMWiki: [],
    transformedDistrictsSOIGeo: [],
    unmatchedDistrictsSOIGeo: [],
  };

  const districtsProgressDir = path.join(__dirname, "district-pipeline-logs");
  const progressStatusFile = path.join(districtsProgressDir, "progressStatus.json");

  try {
    await runPipeline(steps, outputs, districtsProgressDir, progressStatusFile);
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

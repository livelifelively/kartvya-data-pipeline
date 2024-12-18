import path from "path";
import fs from "fs";
import { groupBy, keyBy, map, reduce, size } from "lodash";
import { createGraphQLClient } from "../knowledge-graph/generic/generic.utils";
import { createNodeType, queryNodeType } from "../knowledge-graph/generic/generic.create";
import { fetchByRelationId, fetchDistrictsOSMRelationIdsForState } from "../maps/india-osm/states.fetch-geojsons";
import { processListOfWikipediaPages } from "../admin-regions/districts/extract-district-page-data";
import { generateNameId } from "../knowledge-graph/region-names/region-names.utils";
import {
  multiPolygonToDgraphMultiPolygon,
  polygonToMultiPolygon,
} from "../admin-regions/states/andhra-pradesh/scripts/districts";
import { upsert_Name_ } from "../knowledge-graph/name/name.update";
import { runPipeline } from "./pipeline";

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
  url: string;
  results: {
    wikidata_qid?: string;
    wikipedia_page?: string;
    last_updated_on?: string;
  };
}

interface DistrictsTransformationWikidata extends District {
  name_id: string;
  id_url: string;
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
  const { stateUT, districtsList, districts } = outputs;

  try {
    const districts = districtsList.map((val: any) => ({
      names: [val.name],
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
    const stateDetails = await queryNodeType("_Indian_State_Union_Territory_", graphQLClient, stateUT.name_id, [
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
  const { stateUT, progressDir } = outputs;

  const geojsonFile = path.join(progressDir, "../../d.geo.json");
  let districtsGeoSOI: any;
  if (fs.existsSync(geojsonFile)) {
    districtsGeoSOI = JSON.parse(fs.readFileSync(geojsonFile, "utf8"));
  } else {
    throw new Error("Geojson file not found!");
  }

  try {
    const districtFeaturesSOI = districtsGeoSOI?.filter(
      (dist: any) => dist.properties.stname.toLowerCase() === stateUT.state_name.toLowerCase()
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

export async function transformDistrictsWikipediaData(outputs: Record<string, any>): Promise<any> {
  const { districtsWikiDetails, stateUT, districts } = outputs;

  const keyedDistricts: Record<string, District> = keyBy(districts, "wikipedia_page");
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
          name_id: generateNameId(
            `in-d-${stateUT.vehicle_code.toLowerCase()}-`,
            keyedDistricts[wikiDistrict.url].names[0]
          ),
          wikidata_qid: wikiDistrict.results.wikidata_qid,
          id_url: wikiDistrict.url,
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

export async function transformDistrictsWithSOIGeo(outputs: Record<string, any>): Promise<any> {
  const { districtFeaturesSOI, allMatchedDistrictsOSMWiki } = outputs;

  const transformedDistrictsSOIGeo: DistrictsTransformationSOIGeo[] = [];
  const unmatchedDistricts: DistrictsTransformationOSM[] = [];
  let status: "SUCCESS" | "FAILURE" | "PARTIAL" = "SUCCESS";

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

export async function addDistrictDataToKnowledgeGraph(outputs: Record<string, any>) {
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
      id_url: td.id_url,
      name_id: td.name_id,
    });
  }

  return { savedToKnowledgeGraph, status: "SUCCESS" };
}

async function sampleFunction(stateUT: any) {
  // const stateUT = { name: "andaman and nicobar islands", region_id: "in-sut-andaman-nicobar-islands" };
  console.log("DISTRICTS PROCESSING INITIALIZED: ", stateUT.state_name);

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

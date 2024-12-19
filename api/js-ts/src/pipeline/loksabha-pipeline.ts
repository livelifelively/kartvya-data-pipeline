import path from "path";
import fs from "fs";
import { flatten, groupBy, isEqual, keyBy, map, reduce, size, uniqWith } from "lodash";

import { queryNodeType, createNodeType } from "../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../knowledge-graph/generic/generic.utils";

import { upsert_Name_ } from "../knowledge-graph/name/name.update";

import { processListOfWikipediaPages } from "../admin-regions/loksabha/extract-loksabha-page-data";
import { PipelineStep, runPipeline } from "./pipeline";
import { generateNameId } from "../knowledge-graph/region-names/region-names.utils";
import { multiPolygonToDgraphMultiPolygon, polygonToMultiPolygon } from "./pipeline-utils";

interface LoksabhaConstituency {
  names: string[];
  wikipedia_page: string;
  // states_union_territories: string;
}

type StepStatus = "SUCCESS" | "FAILURE" | "PARTIAL";

interface StateLoksabhaConstituencies {
  state: string;
  name_id: string;
  loksabha_constituencies: LoksabhaConstituency[];
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

interface StateLoksabhaConstituencyTransformationWikidata {
  state: string;
  name_id: string;
  loksabha_constituencies: LoksabhaConstituencyTransformationWikidata[];
}

interface WikiLoksabhaConstituencyResult {
  urls: string[];
  results?: {
    infobox?: any;
    wikidata_qid?: string;
    wikipedia_page?: string;
    last_updated_on?: string;
  };
  errors?: any;
}

interface LoksabhaConstituencyTransformationWikidata extends LoksabhaConstituency {
  name_id: string;
  id_url: string[];
  wikidata_qid: string;
  wikipedia_page: string;
  states_union_territories: string;
  established_on_string?: string;
  constituency_number?: string;
  reservation?: "SC" | "ST" | "NONE";
}

interface LoksabhaConstituencyTransformationECIGeo extends LoksabhaConstituencyTransformationWikidata {
  geo_eci: any;
}

export async function fetchStateLoksabhaConstituencies(outputs: Record<string, any>): Promise<{
  stateLoksabhaConstituencies: LoksabhaConstituency[];
  loksabhaConstituenciesCount: number;
  status: StepStatus;
}> {
  const { vcDLcList } = outputs;

  try {
    const stateLoksabhaConstituencies: LoksabhaConstituency[] = vcDLcList.map((val: any) => ({
      // loksabha_constituency_number: val.loksabha_constituency_number,
      names: [val.loksabha_constituency_name],
      wikipedia_page: val.loksabha_constituency_wikipedia_page,
      // states_union_territories: stateUT.name_id,
    }));

    return {
      stateLoksabhaConstituencies,
      loksabhaConstituenciesCount: stateLoksabhaConstituencies.length,
      status: "SUCCESS",
    };
  } catch (e) {
    throw e;
  }
}

export async function fetchLoksabhaConstituenciesWikiDetails(outputs: Record<string, any>): Promise<{
  loksabhaConstituenciesWikiDetails: WikiLoksabhaConstituencyResult[];
  loksabhaConstituenciesWikiDetailsFailed: WikiLoksabhaConstituencyResult[];
  status: StepStatus;
}> {
  const { stateLoksabhaConstituencies } = outputs;

  let status: StepStatus = "SUCCESS";
  try {
    const urls = map(stateLoksabhaConstituencies, (val) => val.wikipedia_page);
    const { success, failure } = await processListOfWikipediaPages(urls);

    if (failure.length) status = "PARTIAL";

    let keyedSuccessfulResults: Record<string, WikiLoksabhaConstituencyResult[]> = groupBy(
      success,
      "results.wikipedia_page"
    );

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

    return {
      loksabhaConstituenciesWikiDetails: flatten(Object.values(keyedSuccessfulResults)),
      loksabhaConstituenciesWikiDetailsFailed: failure,
      status,
    };
  } catch (e) {
    throw e;
  }
}

export async function fetchLoksabhaConstituencyECIGeoFeatures(outputs: Record<string, any>): Promise<{
  loksabhaConstituencyFeaturesECI?: GeoJSONFeature[];
  status: StepStatus;
}> {
  const { stateUT, progressDir } = outputs;

  const geojsonFile = path.join(progressDir, "../../d.geo.json");
  let loksabhaConstituenciesGeoECI: any;
  if (fs.existsSync(geojsonFile)) {
    loksabhaConstituenciesGeoECI = JSON.parse(fs.readFileSync(geojsonFile, "utf8"));
  } else {
    throw new Error("Geojson file not found!");
  }

  try {
    const loksabhaConstituencyFeaturesECI: GeoJSONFeature[] = loksabhaConstituenciesGeoECI?.filter(
      (dist: any) => dist.properties.stname.toLowerCase() === stateUT.state_name.toLowerCase()
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

export async function transformLoksabhaConstituenciesWikipediaData(outputs: Record<string, any>): Promise<{
  transformedLoksabhaConstituenciesWikipedia: LoksabhaConstituencyTransformationWikidata[];
  loksabhaConstituenciesNotTransformedWikipedia: any;
  status: StepStatus;
}> {
  const {
    loksabhaConstituenciesWikiDetails,
    loksabhaConstituenciesWikiDetailsFailed,
    stateLoksabhaConstituencies,
    stateUT,
  } = outputs;

  let keyedLoksabhaConstituencies: Record<string, LoksabhaConstituency> = keyBy(
    stateLoksabhaConstituencies,
    "wikipedia_page"
  );

  const transformedLoksabhaConstituenciesWikipedia: LoksabhaConstituencyTransformationWikidata[] = [];
  let loksabhaConstituenciesNotTransformedWikipedia: any;
  const missingUrls: string[] = [];
  let status: StepStatus = "SUCCESS";

  loksabhaConstituenciesWikiDetails.forEach((wikiLoksabhaConstituency: any) => {
    if (!keyedLoksabhaConstituencies[wikiLoksabhaConstituency.url]) {
      missingUrls.push(wikiLoksabhaConstituency.url);
      status = "PARTIAL";
    } else {
      if (wikiLoksabhaConstituency.results.wikidata_qid) {
        const allNames = wikiLoksabhaConstituency.urls.reduce((agg: any, url: any) => {
          agg = agg.concat(keyedLoksabhaConstituencies[url].names);
          return agg;
        }, []);

        const toPush: LoksabhaConstituencyTransformationWikidata = {
          wikidata_qid: wikiLoksabhaConstituency.results.wikidata_qid,
          id_url: wikiLoksabhaConstituency.urls,
          wikipedia_page: wikiLoksabhaConstituency.results.wikidata_page,
          names: allNames,
          states_union_territories: stateUT.name_id,
          name_id: generateNameId(
            `in-lc-${stateUT.vehicle_code.toLowerCase()}-`,
            keyedLoksabhaConstituencies[wikiLoksabhaConstituency.urls[0]].names[0]
          ),
        };

        transformedLoksabhaConstituenciesWikipedia.push();

        if (wikiLoksabhaConstituency.results.infobox?.constituencyDetails?.established) {
          toPush.established_on_string = wikiLoksabhaConstituency.results.infobox.constituencyDetails.established;
        }

        if (wikiLoksabhaConstituency.results.infobox?.constituencyDetails?.reservation) {
          toPush.reservation = wikiLoksabhaConstituency.results.infobox.constituencyDetails.reservation.toUpperCase();
        }

        delete keyedLoksabhaConstituencies[wikiLoksabhaConstituency.url];
      }
    }
  });

  if (size(keyedLoksabhaConstituencies)) {
    // if they are present in the failed wikidata requests, then partial success
    // else there should be multi-url result
    loksabhaConstituenciesWikiDetailsFailed.map((val: any) => {
      if (keyedLoksabhaConstituencies[val.url]) {
        status = "PARTIAL";
        loksabhaConstituenciesNotTransformedWikipedia.push(keyedLoksabhaConstituencies[val.url]);
      }
    });
  }

  return {
    transformedLoksabhaConstituenciesWikipedia,
    loksabhaConstituenciesNotTransformedWikipedia,
    status,
  };
}

export async function transformLoksabhaConstituenciesWithECIGeo(outputs: Record<string, any>): Promise<{
  transformedLoksabhaConstituenciesECIGeo: LoksabhaConstituencyTransformationECIGeo[];
  unmatchedLoksabhaConstituenciesECIGeo: LoksabhaConstituencyTransformationWikidata[];
  status: StepStatus;
}> {
  const { loksabhaConstituencyFeaturesECI, transformedLoksabhaConstituenciesWikipedia } = outputs;

  const transformedLoksabhaConstituenciesECIGeo: LoksabhaConstituencyTransformationECIGeo[] = [];
  const unmatchedLoksabhaConstituencies: LoksabhaConstituencyTransformationWikidata[] = [];
  let status: StepStatus = "SUCCESS";

  transformedLoksabhaConstituenciesWikipedia.forEach(
    (loksabhaConstituency: LoksabhaConstituencyTransformationWikidata) => {
      const matchedGeoDetail = loksabhaConstituencyFeaturesECI.find((geoDetail: GeoJSONFeature) => {
        const lowerCaseLoksabhaConstituencyNames = loksabhaConstituency.names.map((n) => n.toLowerCase());
        return lowerCaseLoksabhaConstituencyNames.includes(geoDetail.properties.dtname.toLowerCase());
      });

      if (matchedGeoDetail) {
        transformedLoksabhaConstituenciesECIGeo.push({
          ...loksabhaConstituency,
          geo_eci: matchedGeoDetail,
        });
      } else {
        unmatchedLoksabhaConstituencies.push(loksabhaConstituency);
        status = "PARTIAL";
      }
    }
  );

  return {
    transformedLoksabhaConstituenciesECIGeo,
    unmatchedLoksabhaConstituenciesECIGeo: unmatchedLoksabhaConstituencies,
    status,
  };
}

export async function addLoksabhaConstituencyDataToKnowledgeGraph(outputs: Record<string, any>): Promise<{
  savedToKnowledgeGraph: any;
  status: StepStatus;
}> {
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

      node_created_on: new Date(),
    };

    const loksabhaConstituencyMapECI = polygonToMultiPolygon(td.geo_eci);

    let geo_eci = {
      area: multiPolygonToDgraphMultiPolygon(loksabhaConstituencyMapECI.geometry.coordinates),
      category: "Region",
      source_name: "Election Commission Of India",
      //   source_url: `https://results.eci.gov.in/PcResultGenJune2024/pc/${lc.geo.properties.ST_CODE}.js`,
      source_data: `${JSON.stringify(td.geo_eci)}`,
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
      id_url: td.id_url,
      name_id: td.name_id,
    });
  }

  return { savedToKnowledgeGraph, status: "SUCCESS" };
}

async function sampleFunction(stateUT: any) {
  console.log("LOKSABHA PROCESSING INITIALIZED: ", stateUT.state_name);

  const steps: PipelineStep[] = [
    {
      name: "Fetch State Loksabha_Constituency",
      function: fetchStateLoksabhaConstituencies,
      key: "STATE_LOKSABHA_LIST",
      input: stateUT,
    },
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
    // {
    //   name: "Save Loksabha_Constituency to KnowledgeGraph",
    //   function: addLoksabhaConstituencyDataToKnowledgeGraph,
    //   input: null,
    //   key: "SAVE_DISTRICT_DATA_TO_KNOWLEDGE_GRAPH",
    // },
  ];

  let outputs: Record<string, any> = {
    stateUT,
    vcDLcList: [],
    stateLoksabhaConstituencies: [],
    loksabhaConstituenciesCount: 0,
    loksabhaConstituenciesWikiDetails: [],
    loksabhaConstituenciesWikiDetailsFailed: [],
    loksabhaConstituencyFeaturesECI: [],
    transformedLoksabhaConstituenciesWikipedia: [],
    loksabhaConstituenciesNotTransformedWikipedia: [],
    transformedLoksabhaConstituenciesECIGeo: [],
    unmatchedLoksabhaConstituenciesECIGeo: [],
  };

  const loksabhaConstituenciesProgressDir = path.join(__dirname, "loksabha-constituency-pipeline-logs");
  const progressStatusFile = path.join(loksabhaConstituenciesProgressDir, "progressStatus.json");

  try {
    await runPipeline(steps, outputs, loksabhaConstituenciesProgressDir, progressStatusFile);
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

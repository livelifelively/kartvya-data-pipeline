import path from "path";
import fs from "fs";
import { flatten, groupBy, isEqual, keyBy, map, reduce, size, uniqWith } from "lodash";

import { queryNodeType, createNodeType } from "../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../knowledge-graph/generic/generic.utils";

import { upsert_Name_ } from "../knowledge-graph/name/name.update";

import { processListOfWikipediaPages } from "../admin-regions/vidhansabha/extract-vidhansabha-page-data";
import { PipelineStep, runPipeline } from "./pipeline";
import { generateNameId } from "../knowledge-graph/region-names/region-names.utils";
import { multiPolygonToDgraphMultiPolygon, polygonToMultiPolygon } from "./pipeline-utils";

interface VidhansabhaConstituency {
  names: string[];
  wikipedia_page: string;
  reservation?: "SC" | "ST" | "NONE";
  constituency_number?: string;
  // states_union_territories: string;
}

type StepStatus = "SUCCESS" | "FAILURE" | "PARTIAL";

interface StateVidhansabhaConstituencies {
  state: string;
  name_id: string;
  vidhansabha_constituencies: VidhansabhaConstituency[];
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

interface StateVidhansabhaConstituencyTransformationWikidata {
  state: string;
  name_id: string;
  vidhansabha_constituencies: VidhansabhaConstituencyTransformationWikidata[];
}

interface WikiVidhansabhaConstituencyResult {
  urls: string[];
  results?: {
    infobox?: any;
    wikidata_qid?: string;
    wikipedia_page?: string;
    last_updated_on?: string;
  };
  errors?: any;
}

interface VidhansabhaConstituencyTransformationWikidata extends VidhansabhaConstituency {
  name_id: string;
  id_url: string[];
  wikidata_qid: string;
  wikipedia_page: string;
  states_union_territories: string;
  established_on_string?: string;
  constituency_number?: string;
  reservation?: "SC" | "ST" | "NONE";
}

interface VidhansabhaConstituencyTransformationECIGeo extends VidhansabhaConstituencyTransformationWikidata {
  geo_eci: any;
}

export async function fetchStateVidhansabhaConstituencies(outputs: Record<string, any>): Promise<{
  stateVidhansabhaConstituencies: VidhansabhaConstituency[];
  vidhansabhaConstituenciesCount: number;
  status: StepStatus;
}> {
  const { stateUT, vcDLcList } = outputs;

  try {
    const stateVidhansabhaConstituencies: VidhansabhaConstituency[] = vcDLcList.map((val: any) => ({
      // vidhansabha_constituency_number: val.vidhansabha_constituency_number,
      names: [val.vidhansabha_constituency_name],
      wikipedia_page: val.vidhansabha_constituency_wikipedia_page,
      reservation: val.reservation,
      constituency_number: val.vidhansabha_constituency_number,
      // states_union_territories: stateUT.name_id,
    }));

    return {
      stateVidhansabhaConstituencies,
      vidhansabhaConstituenciesCount: stateVidhansabhaConstituencies.length,
      status: "SUCCESS",
    };
  } catch (e) {
    throw e;
  }
}

export async function fetchVidhansabhaConstituenciesWikiDetails(outputs: Record<string, any>): Promise<{
  vidhansabhaConstituenciesWikiDetails: WikiVidhansabhaConstituencyResult[];
  vidhansabhaConstituenciesWikiDetailsFailed: WikiVidhansabhaConstituencyResult[];
  status: StepStatus;
}> {
  const { stateVidhansabhaConstituencies } = outputs;

  let status: StepStatus = "SUCCESS";
  try {
    const urls = map(stateVidhansabhaConstituencies, (val) => val.wikipedia_page);
    const { success, failure } = await processListOfWikipediaPages(urls);

    if (failure.length) status = "PARTIAL";

    let keyedSuccessfulResults: Record<string, WikiVidhansabhaConstituencyResult[]> = groupBy(
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
      vidhansabhaConstituenciesWikiDetails: flatten(Object.values(keyedSuccessfulResults)),
      vidhansabhaConstituenciesWikiDetailsFailed: failure,
      status,
    };
  } catch (e) {
    throw e;
  }
}

export async function fetchVidhansabhaConstituencyECIGeoFeatures(outputs: Record<string, any>): Promise<{
  vidhansabhaConstituencyFeaturesECI?: GeoJSONFeature[];
  status: StepStatus;
}> {
  const { stateUT, progressDir } = outputs;

  const geojsonFile = path.join(progressDir, "../vc.geo.json");
  let vidhansabhaConstituenciesGeoECI: any;
  if (fs.existsSync(geojsonFile)) {
    vidhansabhaConstituenciesGeoECI = JSON.parse(fs.readFileSync(geojsonFile, "utf8"));
  } else {
    throw new Error("Geojson file not found!");
  }

  try {
    const vidhansabhaConstituencyFeaturesECI: GeoJSONFeature[] = vidhansabhaConstituenciesGeoECI?.features?.filter(
      (dist: any) => dist.properties.ST_NAME.toLowerCase() === stateUT.name.toLowerCase()
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

export async function transformVidhansabhaConstituenciesWikipediaData(outputs: Record<string, any>): Promise<{
  transformedVidhansabhaConstituenciesWikipedia: VidhansabhaConstituencyTransformationWikidata[];
  vidhansabhaConstituenciesNotTransformedWikipedia: any;
  vidhansabhaConstituenciesMissingUrlsAndIssues: any;
  status: StepStatus;
}> {
  const {
    vidhansabhaConstituenciesWikiDetails,
    vidhansabhaConstituenciesWikiDetailsFailed,
    stateVidhansabhaConstituencies,
    stateUT,
  } = outputs;

  let keyedVidhansabhaConstituencies: Record<string, VidhansabhaConstituency> = keyBy(
    stateVidhansabhaConstituencies,
    "wikipedia_page"
  );

  const transformedVidhansabhaConstituenciesWikipedia: VidhansabhaConstituencyTransformationWikidata[] = [];
  let vidhansabhaConstituenciesNotTransformedWikipedia: any;
  const missingUrlsAndIssues: any[] = [];
  let status: StepStatus = "SUCCESS";

  vidhansabhaConstituenciesWikiDetails.forEach((wikiVidhansabhaConstituency: any) => {
    if (!keyedVidhansabhaConstituencies[wikiVidhansabhaConstituency.urls[0]]) {
      missingUrlsAndIssues.push(wikiVidhansabhaConstituency.urls[0]);
      status = "PARTIAL";
    } else {
      if (wikiVidhansabhaConstituency.results.wikidata_qid) {
        const allNames = wikiVidhansabhaConstituency.urls.reduce((agg: any, url: any) => {
          agg = agg.concat(keyedVidhansabhaConstituencies[url].names);
          return agg;
        }, []);

        const toPush: VidhansabhaConstituencyTransformationWikidata = {
          wikidata_qid: wikiVidhansabhaConstituency.results.wikidata_qid,
          id_url: wikiVidhansabhaConstituency.urls,
          wikipedia_page: wikiVidhansabhaConstituency.results.wikipedia_page,
          names: allNames,
          states_union_territories: stateUT.name_id,
          name_id: generateNameId(
            `in-vc-${stateUT.vehicle_code.toLowerCase()}-`,
            keyedVidhansabhaConstituencies[wikiVidhansabhaConstituency.urls[0]].names[0]
          ),
          reservation: keyedVidhansabhaConstituencies[wikiVidhansabhaConstituency.urls[0]].reservation,
        };

        if (wikiVidhansabhaConstituency.results.infobox?.constituencyDetails?.established) {
          toPush.established_on_string =
            wikiVidhansabhaConstituency.results.infobox.constituencyDetails.established?.text;
        }

        if (wikiVidhansabhaConstituency.results.infobox?.constituencyDetails?.reservation) {
          if (
            toPush.reservation &&
            toPush.reservation.toLowerCase() !==
              wikiVidhansabhaConstituency.results.infobox?.constituencyDetails?.reservation.text.toLowerCase()
          ) {
            missingUrlsAndIssues.push({ ...toPush, ISSUE: "RESERVATION STATUS NOT CLEAR" });
          }
          if (!toPush.reservation)
            toPush.reservation =
              wikiVidhansabhaConstituency.results.infobox.constituencyDetails.reservation.text.toUpperCase();
        }

        transformedVidhansabhaConstituenciesWikipedia.push(toPush);

        delete keyedVidhansabhaConstituencies[wikiVidhansabhaConstituency.urls[0]];
      }
    }
  });

  if (size(keyedVidhansabhaConstituencies)) {
    // if they are present in the failed wikidata requests, then partial success
    // else there should be multi-url result
    vidhansabhaConstituenciesWikiDetailsFailed.map((val: any) => {
      if (keyedVidhansabhaConstituencies[val.url]) {
        status = "PARTIAL";
        vidhansabhaConstituenciesNotTransformedWikipedia.push(keyedVidhansabhaConstituencies[val.url]);
      }
    });
  }

  return {
    transformedVidhansabhaConstituenciesWikipedia,
    vidhansabhaConstituenciesNotTransformedWikipedia,
    vidhansabhaConstituenciesMissingUrlsAndIssues: missingUrlsAndIssues,
    status,
  };
}

export async function transformVidhansabhaConstituenciesWithECIGeo(outputs: Record<string, any>): Promise<{
  transformedVidhansabhaConstituenciesECIGeo: VidhansabhaConstituencyTransformationECIGeo[];
  unmatchedVidhansabhaConstituenciesECIGeo: VidhansabhaConstituencyTransformationWikidata[];
  status: StepStatus;
}> {
  const { vidhansabhaConstituencyFeaturesECI, transformedVidhansabhaConstituenciesWikipedia } = outputs;

  const transformedVidhansabhaConstituenciesECIGeo: VidhansabhaConstituencyTransformationECIGeo[] = [];
  const unmatchedVidhansabhaConstituencies: VidhansabhaConstituencyTransformationWikidata[] = [];
  let status: StepStatus = "SUCCESS";

  transformedVidhansabhaConstituenciesWikipedia.forEach(
    (vidhansabhaConstituency: VidhansabhaConstituencyTransformationWikidata) => {
      const matchedGeoDetail = vidhansabhaConstituencyFeaturesECI.find((geoDetail: GeoJSONFeature) => {
        const lowerCaseVidhansabhaConstituencyNames = vidhansabhaConstituency.names.map((n) => n.toLowerCase());
        return lowerCaseVidhansabhaConstituencyNames.includes(geoDetail.properties.AC_NAME.toLowerCase());
      });

      if (matchedGeoDetail) {
        transformedVidhansabhaConstituenciesECIGeo.push({
          ...vidhansabhaConstituency,
          constituency_number: vidhansabhaConstituency.constituency_number || matchedGeoDetail.properties.AC_NO,
          geo_eci: matchedGeoDetail,
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

export async function addVidhansabhaConstituencyDataToKnowledgeGraph(outputs: Record<string, any>): Promise<{
  savedToKnowledgeGraph: any;
  status: StepStatus;
}> {
  const { transformedVidhansabhaConstituenciesECIGeo } = outputs;

  let savedToKnowledgeGraph: any = [];
  const graphQLClient = await createGraphQLClient();

  for (let td of transformedVidhansabhaConstituenciesECIGeo) {
    let toSaveVidhansabhaConstituency = {
      name_id: td.name_id,
      names: td.names.map((val: any) => {
        return {
          name: val,
        };
      }),

      states_union_territories: [{ name_id: td.states_union_territories }],
      established_on_string: td.established_on_string,

      wikipedia_page: td.wikipedia_page,
      wikidata_qid: td.wikidata_qid,

      node_created_on: new Date(),
    };

    const vidhansabhaConstituencyMapECI = polygonToMultiPolygon(td.geo_eci);

    let geo_eci = {
      area: multiPolygonToDgraphMultiPolygon(vidhansabhaConstituencyMapECI.geometry.coordinates),
      category: "Region",
      source_name: "Election Commission Of India",
      //   source_url: `https://results.eci.gov.in/PcResultGenJune2024/pc/${lc.geo.properties.ST_CODE}.js`,
      source_data: `${JSON.stringify(td.geo_eci)}`,
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
      id_url: td.id_url,
      name_id: td.name_id,
    });

    console.log({
      nameIds,
      vidhansabhaConstituencyId,
      vidhansabhaConstituencyRegionId,
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
      name: "Fetch State Vidhansabha_Constituency",
      function: fetchStateVidhansabhaConstituencies,
      key: "STATE_LOKSABHA_LIST",
      input: stateUT,
    },
    {
      name: "Fetch Vidhansabha_Constituency Wiki Details",
      function: fetchVidhansabhaConstituenciesWikiDetails,
      key: "STATE_LOKSABHA_CONSTITUENCY_WIKI_DATA",
      input: null, // Will be set after the first step
    },
    {
      name: "Fetch VidhansabhaConstituency ECI Geo Features",
      function: fetchVidhansabhaConstituencyECIGeoFeatures,
      key: "STATE_LOKSABHA_CONSTITUENCY_ECI_GEO_DATA",
      input: stateUT,
    },
    {
      name: "Append Wikipedia Data",
      function: transformVidhansabhaConstituenciesWikipediaData,
      input: null, // Will be set after the fifth step
      key: "APPEND_WIKIPEDIA_DATA_TRANSFORM_STATE_LOKSABHA_CONSTITUENCY_DATA",
    },
    {
      name: "Transform Vidhansabha_Constituency with ECI Geo",
      function: transformVidhansabhaConstituenciesWithECIGeo,
      input: null, // Will be set after the sixth and seventh steps
      key: "APPEND_ECI_DATA_TRANSFORM_STATE_LOKSABHA_CONSTITUENCY_DATA",
    },
    // {
    //   name: "Save Vidhansabha_Constituency to KnowledgeGraph",
    //   function: addVidhansabhaConstituencyDataToKnowledgeGraph,
    //   input: null,
    //   key: "SAVE_DISTRICT_DATA_TO_KNOWLEDGE_GRAPH",
    // },
  ];

  let outputs: Record<string, any> = {
    stateUT,
    vcDLcList: [],
    stateVidhansabhaConstituencies: [],
    vidhansabhaConstituenciesCount: 0,
    vidhansabhaConstituenciesWikiDetails: [],
    vidhansabhaConstituenciesWikiDetailsFailed: [],
    vidhansabhaConstituencyFeaturesECI: [],
    transformedVidhansabhaConstituenciesWikipedia: [],
    vidhansabhaConstituenciesNotTransformedWikipedia: [],
    transformedVidhansabhaConstituenciesECIGeo: [],
    unmatchedVidhansabhaConstituenciesECIGeo: [],
    vidhansabhaConstituenciesMissingUrlsAndIssues: [],
  };

  const vidhansabhaConstituenciesProgressDir = path.join(__dirname, "vidhansabha-constituency-pipeline-logs");
  const progressStatusFile = path.join(vidhansabhaConstituenciesProgressDir, "progressStatus.json");

  try {
    await runPipeline(steps, outputs, vidhansabhaConstituenciesProgressDir, progressStatusFile);
  } catch (error) {
    console.error("Error in processing: ", error);
  }
}

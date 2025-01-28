import path from "path";
import fs from "fs";
import { filter, flatten, groupBy, isEqual, keyBy, map, reduce, size, uniqWith } from "lodash";

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
  reservation?: "SC" | "ST" | "NONE" | "SANGHA";
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
  reservation?: "SC" | "ST" | "NONE" | "SANGHA";
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
          constituency_number: keyedVidhansabhaConstituencies[wikiVidhansabhaConstituency.urls[0]].constituency_number,
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

export async function checkForDuplicateNameIds(outputs: Record<string, any>): Promise<{
  transformedVidhansabhaConstituenciesWikipedia: VidhansabhaConstituencyTransformationWikidata[];
  status: StepStatus;
}> {
  const { transformedVidhansabhaConstituenciesWikipedia } = outputs;

  const repeatedNameIds = groupBy(transformedVidhansabhaConstituenciesWikipedia, "name_id");
  const duplicates = filter(repeatedNameIds, (val) => val.length > 1);
  const keyedByWikidataQId = keyBy(transformedVidhansabhaConstituenciesWikipedia, "wikidata_qid");

  if (duplicates.length) {
    duplicates.forEach((val) => {
      val.forEach((v, i) => {
        keyedByWikidataQId[v.wikidata_qid] = {
          ...keyedByWikidataQId[v.wikidata_qid],
          name_id: `${keyedByWikidataQId[v.wikidata_qid].name_id}-${i}`,
        };
      });
    });
  }

  return {
    transformedVidhansabhaConstituenciesWikipedia: Object.values(keyedByWikidataQId),
    status: "SUCCESS",
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
        return parseInt(vidhansabhaConstituency.constituency_number || "") === geoDetail.properties.AC_NO;
      });

      if (matchedGeoDetail) {
        let toSaveVC = {
          ...vidhansabhaConstituency,
          constituency_number: vidhansabhaConstituency.constituency_number || matchedGeoDetail.properties.AC_NO,
          geo_eci: matchedGeoDetail,
        };

        const lowerCaseVidhansabhaConstituencyNames = vidhansabhaConstituency.names.map((n) => n.toLowerCase());
        if (!lowerCaseVidhansabhaConstituencyNames.includes(matchedGeoDetail.properties.AC_NAME.toLowerCase()))
          toSaveVC.names.push(matchedGeoDetail.properties.AC_NAME);

        transformedVidhansabhaConstituenciesECIGeo.push(toSaveVC);
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
    let geo_eci,
      geoECIId,
      geoOSMId,
      geoSourceId,
      eciVidhansabhaConstituencyRegionId,
      toSaveVidhansabhaConstituencyRegion: any;

    if (td.geo_eci) {
      const vidhansabhaConstituencyMapECI = polygonToMultiPolygon(td.geo_eci);

      geoSourceId = await createNodeType("_Source_Data_", graphQLClient, {
        source: { name_id: "election-commission-of-india" },
        source_url: `https://results.eci.gov.in/ResultAcGenNov2024/ac/${td.geo_eci.properties.ST_CODE}.js`,
        source_data: `${JSON.stringify(td.geo_eci)}`,
      });

      geoECIId = await createNodeType("_Geo_", graphQLClient, {
        category: "Region",
        area: multiPolygonToDgraphMultiPolygon(vidhansabhaConstituencyMapECI.geometry.coordinates),
        node_created_on: new Date(),
        source: { id: geoSourceId },
      });
    }

    toSaveVidhansabhaConstituencyRegion = {
      name_id: `${td.name_id}-version-25-region`,
      geo_boundary: [],
      states_union_territories: [{ name_id: `${td.states_union_territories}-version-25-region` }],
      node_created_on: new Date(),
    };

    if (geoECIId) {
      toSaveVidhansabhaConstituencyRegion.geo_boundary.push({ id: geoECIId });
    }

    // save vidhansabhaConstituency region
    eciVidhansabhaConstituencyRegionId = await createNodeType(
      "_Indian_Vidhansabha_Constituency_Version_Region_",
      graphQLClient,
      toSaveVidhansabhaConstituencyRegion
    );

    let toSaveVidhansabhaConstituencyVersion: any = {
      name_id: `${td.name_id}-version-25`,
      region: { id: eciVidhansabhaConstituencyRegionId },
      constituency_number: td.constituency_number,
      reservation: td.reservation,
    };

    const vidhansabhaConstituencyVersionId = await createNodeType(
      "_Indian_Vidhansabha_Constituency_Version_",
      graphQLClient,
      toSaveVidhansabhaConstituencyVersion
    );

    let toSaveVidhansabhaConstituency: any = {
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

    let nameIds: any = [];
    for (let n of toSaveVidhansabhaConstituency.names) {
      const nameId = await upsert_Name_(n.name);
      nameIds.push({ id: nameId });
    }

    toSaveVidhansabhaConstituency.active_version = { id: vidhansabhaConstituencyVersionId };
    toSaveVidhansabhaConstituency.versions = [{ id: vidhansabhaConstituencyVersionId }];
    toSaveVidhansabhaConstituency.regions = [{ id: eciVidhansabhaConstituencyRegionId }];

    const vidhansabhaConstituencyId = await createNodeType(
      "_Indian_Vidhansabha_Constituency_",
      graphQLClient,
      toSaveVidhansabhaConstituency
    );

    savedToKnowledgeGraph.push({
      names: nameIds,
      vidhansabhaConstituency: {
        vidhansabhaConstituencyId,
        toSaveVidhansabhaConstituency,
      },
      vidhansabhaConstituencyVersion: {
        vidhansabhaConstituencyVersionId,
        toSaveVidhansabhaConstituencyVersion,
      },
      vidhansabhaConstituencyRegion: {
        vidhansabhaConstituencyRegionId: eciVidhansabhaConstituencyRegionId,
        toSaveVidhansabhaConstituencyRegion,
      },
      geo: {
        geo_eci: geo_eci
          ? {
              geo_eci,
              geoECIId,
            }
          : null,
      },
      id_url: td.id_url,
      name_id: td.name_id,
    });

    console.log({
      nameIds,
      vidhansabhaConstituencyId,
      vidhansabhaConstituencyRegionId: eciVidhansabhaConstituencyRegionId,
      vidhansabhaConstituencyVersionId,
      id_url: td.id_url,
      name_id: td.name_id,
    });
  }

  return { savedToKnowledgeGraph, status: "SUCCESS" };
}

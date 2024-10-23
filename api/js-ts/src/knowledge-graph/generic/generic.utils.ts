import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

export async function createGraphQLClient() {
  const { GraphQLClient } = await import('graphql-request');

  // kartvya-2
  const endpoint = 'https://green-feather-41421553.ap-south-1.aws.cloud.dgraph.io/graphql';
  const apiKey = 'M2M4NDg2YzQxNDJiYTA1YmNjMmMwZjdlOTFhZTc4ZDA=';

  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: apiKey,
    },
  });
}

export const graphqlClientPlugin = fp<FastifyPluginAsync>(
  async (fastify, opts) => {
    const graphQLClient = createGraphQLClient();

    // Attach the client to the Fastify instance
    fastify.decorate('graphqlClient', graphQLClient);
  },
  {
    name: 'graphql-client-plugin',
  }
);

export interface EntityDataCategoriesType {
  id: string[];
  otherIdentifiers: string[];
  sourceDataIds: string[];
}

export interface EntityDataType {
  region: EntityDataCategoriesType;
  administrativeEntity: EntityDataCategoriesType;
  legal: EntityDataCategoriesType;
}

export function evaluateVariablesForRegionType(regionType: string) {
  let nodeType = '';
  let toFetch: EntityDataType = {
    region: {
      id: ['id', 'region_id'],
      otherIdentifiers: [],
      sourceDataIds: [],
    },
    administrativeEntity: {
      id: ['id'],
      otherIdentifiers: ['names { name }'],
      sourceDataIds: ['wikidata_qid', 'wikipedia_page'],
    },
    legal: {
      id: ['id'],
      otherIdentifiers: [],
      sourceDataIds: [],
    },
  };
  let regionNamePrefix = '';

  switch (regionType) {
    case 'Loksabha_Constituency':
      nodeType = 'LoksabhaConstituencyRegion';
      regionNamePrefix = 'in-lc';
      break;

    case 'State':
      nodeType = 'StateRegion';
      regionNamePrefix = 'in-s';

      toFetch.region.sourceDataIds.concat(['wikidata_qid', 'wikipedia_page']);

      toFetch.legal.otherIdentifiers.concat(['iso_code', 'vehicle_code']);
      toFetch.legal.sourceDataIds.concat(['wikidata_qid', 'wikipedia_page', 'official_website']);

      break;

    case 'District':
      nodeType = 'DistrictRegion';
      regionNamePrefix = 'in-d';
      // toFetch.push();
      break;

    case 'Union_Territory':
      nodeType = 'UnionTerritoryRegion';
      regionNamePrefix = 'in-ut';
      // toFetch.push();
      break;

    case 'Vidhan_Sabha':
      nodeType = 'VidhansabhaConstituencyRegion';
      nodeType = 'UnionTerritoryRegion';
      regionNamePrefix = 'in-vc';
  }

  return { nodeType, regionNamePrefix, toFetch };
}

// module.exports = createGraphQLClient;

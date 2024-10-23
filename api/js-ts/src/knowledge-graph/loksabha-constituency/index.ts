// loksabhaConstituency.ts
import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { getStateOrUTAdministrativeEntitiesByRegionName } from '../region-names/region-names.read';
import { createGraphQLClient } from '../generic/generic.utils';
import { createNewLoksabhaConstituency } from './loksabha-constituency.create';
import { ILoksabhaConstituencyInput } from './types';

const loksabhaConstituencyRoutes: FastifyPluginCallback = (fastify: FastifyInstance, options, done) => {
  fastify.get('/', async (request, reply) => {
    const graphQLClient = await createGraphQLClient();

    // const res = createNewLoksabhaConstituency(graphQLClient, als);
    // return res;
  });

  done();
};

export default loksabhaConstituencyRoutes;

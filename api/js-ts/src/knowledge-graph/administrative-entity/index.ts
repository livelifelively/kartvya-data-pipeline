// administrativeEntity.ts
import { FastifyInstance, FastifyPluginCallback } from 'fastify';

const administrativeEntityRoutes: FastifyPluginCallback = (fastify: FastifyInstance, options, done) => {
  fastify.get('/administrative-entity', async (request, reply) => {
    return { data: 'Data for administrative entities.' };
  });

  done();
};

export default administrativeEntityRoutes;

import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import administrativeEntityRoutes from './administrative-entity';
import loksabhaConstituencyRoutes from './loksabha-constituency';

const knowledgeGraphRoutes: FastifyPluginCallback = (fastify: FastifyInstance, options, done) => {
  fastify.register(administrativeEntityRoutes, { prefix: '/administrative-entity' });
  fastify.register(loksabhaConstituencyRoutes, { prefix: '/loksabha-constituency' });

  fastify.get('/', async (request, reply) => {
    return { data: 'Welcome to the Knowledge Graph API.' };
  });

  done();
};

export default knowledgeGraphRoutes;

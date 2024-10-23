import fastify, { FastifyInstance } from 'fastify';
import knowledgeGraphRoutes from './knowledge-graph';
import { graphqlClientPlugin } from './knowledge-graph/generic/generic.utils';

// Create a server instance
const server: FastifyInstance = fastify({ logger: true });

// Register the GraphQL client plugin
server.register(graphqlClientPlugin);

// Register the knowledge-graph routes with a prefix
server.register(knowledgeGraphRoutes, { prefix: '/knowledge-graph' });

// Declare a basic route
server.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Run the server!
const start = async () => {
  try {
    await server.listen({ port: 1337 });
    console.log(`Server is listening on ${JSON.stringify(server.server.address())}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

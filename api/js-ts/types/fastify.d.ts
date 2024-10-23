// types/fastify.d.ts
import { GraphQLClient } from 'graphql-request';

// Augment the Fastify module
declare module 'fastify' {
  export interface FastifyInstance {
    graphqlClient: GraphQLClient;
  }
}

import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';

import { AuthChecker } from '../helpers/AuthChecker';

import { setupApolloContext } from './setupApolloContext';

async function startGraphQlServer() {
  const authChecker = new AuthChecker();

  const schema = await buildSchema({
    resolvers: [path.join(__dirname, 'modules', '**', 'resolver.ts')],
    authChecker: ({ context }) => !!authChecker.validateToken(context.token),
  });

  const server = new ApolloServer({
    schema,
    context: setupApolloContext,
  });

  await server.start();

  return server;
}

export { startGraphQlServer };

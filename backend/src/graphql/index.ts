import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';

async function startGraphQlServer() {
  const schema = await buildSchema({
    resolvers: [path.join(__dirname, 'modules', '**', 'resolver.ts')],
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  return server;
}

export { startGraphQlServer };

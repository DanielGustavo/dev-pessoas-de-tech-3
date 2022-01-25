import express from 'express';

import { startGraphQlServer } from './graphql';

const PORT = process.env?.PORT || 4001;

async function startServer() {
  const app = express();

  const graphqlServer = await startGraphQlServer();
  graphqlServer.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`🚀 Server started at port ${PORT}`);
  });

  return app;
}

export { startServer };

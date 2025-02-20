import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import path from 'path';

import { startGraphQlServer } from './graphql';

const PORT = process.env?.PORT || 4001;

async function startServer() {
  const app = express();

  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 })
  );

  app.use('/static', express.static(path.join(__dirname, '..', 'uploads')));

  const graphqlServer = await startGraphQlServer();
  graphqlServer.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`🚀 Server started at port ${PORT}`);
  });

  return app;
}

export { startServer };

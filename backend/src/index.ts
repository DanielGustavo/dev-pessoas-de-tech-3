import 'reflect-metadata';
import 'dotenv/config';

import { startServer } from './server';
import { connectDatabase } from './db';

(async () => {
  await connectDatabase();
  startServer();
})();

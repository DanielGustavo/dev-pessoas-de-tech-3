import { createConnection } from 'typeorm';

import config from '../config/ormconfig';

async function connectDatabase() {
  const connection = await createConnection(config);

  if (connection.isConnected) {
    console.log('🔥 Database is up');
  }

  return connection;
}

export { connectDatabase };

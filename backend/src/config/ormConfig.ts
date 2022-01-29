import 'dotenv/config';

import { ConnectionOptions } from 'typeorm';
import path from 'path';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT || 5432) as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  migrations: [path.join(__dirname, '..', 'db', 'migrations', '*.ts')],
  entities: [path.join(__dirname, '..', 'db', 'entities', '*.ts')],
  cli: {
    entitiesDir: 'src/db/entities',
    migrationsDir: 'src/db/migrations',
  },
};

export default config;

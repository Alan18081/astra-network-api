import { ConnectionOptions } from 'typeorm';

import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './index';

export const ORM_CONFIG = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [`${__dirname}/../../**/*.entity.ts`],
  logging: true,
  synchronize: true,
} as ConnectionOptions;
// Possibly remove in favor of docker env vars
import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

export const typeOrmPostgresConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_POSTGRES_HOST,
  port: parseInt(process.env.TYPEORM_POSTGRES_PORT, 10),
  username: process.env.TYPEORM_POSTGRES_USERNAME,
  password: process.env.TYPEORM_POSTGRES_PASSWORD,
  database: process.env.TYPEORM_POSTGRES_DATABASE,
  entities: [__dirname + '/dbModels/**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_POSTGRES_SYNC === 'ON' ? true : false,
};

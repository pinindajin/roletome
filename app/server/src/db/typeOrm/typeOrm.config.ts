// Possibly remove in favor of docker env vars
import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { DbGame } from './dbModels/game/game.entity';
import { DbRoll } from './dbModels/roll/roll.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

export const typeOrmPostgresConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_POSTGRES_HOST,
  port: parseInt(process.env.TYPEORM_POSTGRES_PORT, 10),
  username: process.env.TYPEORM_POSTGRES_USERNAME,
  password: process.env.TYPEORM_POSTGRES_PASSWORD,
  database: process.env.TYPEORM_POSTGRES_DATABASE,
  entities: [DbGame, DbRoll],
  synchronize: process.env.TYPEORM_POSTGRES_SYNC === 'ON' ? true : false,
};

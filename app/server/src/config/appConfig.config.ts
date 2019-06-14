// Possibly remove dotenv in favor of docker env vars
import * as dotenv from 'dotenv';
dotenv.config();

export type appConfigKeys = 'GAME_ENDPOINT';
export const APPCONFIGKEYS = {
  GAME_ENDPOINT: 'GAME_ENDPOINT' as appConfigKeys,
};

const CONTROLLER_CONFIGS = new Map<string, string>();
CONTROLLER_CONFIGS.set(APPCONFIGKEYS.GAME_ENDPOINT, process.env.GAME_ENDPOINT);

export const APP_CONFIG = {
  APP_DOMAIN: process.env.APP_DOMAIN,
  APP_PORT: process.env.APP_PORT,
  CONTROLLER_CONFIGS,
};

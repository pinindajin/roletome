import { IGameService, IGameStore } from '@api/game/interfaces';
import { Provider } from '@nestjs/common';
import { ClassProvider, Type } from '@nestjs/common/interfaces';

export enum EGameInjectable {
  GAME_SERVICE = 'GameService',
  GAME_STORE = 'GameStore',
}

export interface IGameServiceProvider extends ClassProvider {
  provide: EGameInjectable;
  useClass: Type<IGameService>;
}

export interface IGameStoreProvider {
  provide: EGameInjectable;
  useClass: Type<IGameStore>;
}
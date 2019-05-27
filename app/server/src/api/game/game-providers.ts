import { IGameService, IGameStore } from '@api/game/interfaces';
import { Provider } from '@nestjs/common';
import { ClassProvider, Type } from '@nestjs/common/interfaces';

export type GameProvidable = 'GAME_SERVICE' | 'GAME_STORE';
export const GameProvidables = {
  GAME_SERVICE: 'GAME_SERVICE',
};

export interface IGameServiceProvider extends ClassProvider {
  provide: GameProvidable;
  useClass: Type<IGameService>;
}

export interface IGameStoreProvider {
  provide: GameProvidable;
  useClass: Type<IGameStore>;
}
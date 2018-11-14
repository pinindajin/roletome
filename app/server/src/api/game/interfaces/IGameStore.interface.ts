import { Game } from '../models/domain/game.model';
import { IStoreSaveResponse } from 'common/interfaces/store';
import { IStoreFindRequest } from 'common/interfaces/store/IStoreFindRequest.interface';
import { IStoreFindResponse } from 'common/interfaces/store/IStoreFindResponse.interface';

export interface IGameStore {
  find(ids: IStoreFindRequest): Promise<IStoreFindResponse<Game>>;
  findOne(id: string): Promise<Game>;
  create(games: Array<Game>): Promise<IStoreSaveResponse<string>>;
  update(games: Array<Game>): Promise<IStoreSaveResponse<string>>;
  delete(ids: Array<string>): Promise<IStoreSaveResponse<string>>;
}

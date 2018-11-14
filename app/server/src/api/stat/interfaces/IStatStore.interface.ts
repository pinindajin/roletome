import { Stat } from '../models/domain/stat.model';
import { IStoreSaveResponse } from 'common/interfaces/store';
import { IStoreFindRequest } from 'common/interfaces/store/IStoreFindRequest.interface';
import { IStoreFindResponse } from 'common/interfaces/store/IStoreFindResponse.interface';

export interface IStatStore {
  find(ids: IStoreFindRequest): Promise<IStoreFindResponse<Stat>>;
  findOne(id: string): Promise<Stat>;
  create(games: Array<Stat>): Promise<IStoreSaveResponse<string>>;
  update(games: Array<Stat>): Promise<IStoreSaveResponse<string>>;
  delete(ids: Array<string>): Promise<IStoreSaveResponse<string>>;
}

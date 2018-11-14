import { IStoreSaveResponse } from 'common/interfaces/store';
import { IStoreFindRequest } from 'common/interfaces/store/IStoreFindRequest.interface';
import { IStoreFindResponse } from 'common/interfaces/store/IStoreFindResponse.interface';
import { Roll } from '../models/domain';

export interface IRollStore {
  find(ids: IStoreFindRequest): Promise<IStoreFindResponse<Roll>>;
  findOne(id: string): Promise<Roll>;
  create(rolls: Array<Roll>): Promise<IStoreSaveResponse<string>>;
  update(rolls: Array<Roll>): Promise<IStoreSaveResponse<string>>;
  delete(ids: Array<string>): Promise<IStoreSaveResponse<string>>;
}

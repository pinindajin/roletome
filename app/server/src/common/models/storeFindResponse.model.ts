import { IStoreFindResponse } from '../interfaces/store/IStoreFindResponse.interface';

export class StoreFindResponse<T> implements IStoreFindResponse<T> {
  pageSize: number;
  pageNumber: number;
  values: Array<T>;
  unfetchedIds: Array<string>;
  moreRecords: boolean;
  totalRecords: number;

  constructor(config?: Partial<StoreFindResponse<T>>) {
    Object.assign(this, config);
  }
}

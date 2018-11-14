import { IServiceFindResponse } from '../interfaces/service/IServiceFindResponse.interface';

export class ServiceFindResponse<T> implements IServiceFindResponse<T> {
  pageSize: number;
  pageNumber: number;
  values: Array<T>;
  unfetchedIds: Array<string>;
  moreRecords: boolean;
  totalRecords: number;

  constructor(config?: Partial<ServiceFindResponse<T>>) {
    Object.assign(this, config);
  }
}

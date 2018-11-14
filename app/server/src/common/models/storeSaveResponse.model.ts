import { IStoreSaveResponse } from '../interfaces/store';

export class StoreSaveResponse<T> implements IStoreSaveResponse<T> {
  values: Array<T>;
  errors: Array<Error>;

  constructor(config?: Partial<StoreSaveResponse<T>>) {
    Object.assign(this, config);
  }
}

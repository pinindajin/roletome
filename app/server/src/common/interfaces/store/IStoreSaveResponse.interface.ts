export interface IStoreSaveResponse<T> {
  values: Array<T>;
  errors: Array<Error>;
}

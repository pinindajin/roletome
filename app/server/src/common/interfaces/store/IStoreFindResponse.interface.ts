export interface IStoreFindResponse<T> {
  pageNumber: number;
  values: Array<T>;
  unfetchedIds: Array<string>;
  moreRecords: boolean;
  totalRecords: number;
}

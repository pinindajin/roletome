export interface IStoreFindResponse<T> {
  pageSize: number;
  pageNumber: number;
  values: Array<T>;
  unfetchedIds: Array<string>;
  moreRecords: boolean;
  totalRecords: number;
}

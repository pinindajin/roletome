export interface IPagedResponse {
  pageSize: number;
  pageNumber: number;
  numberOfRecords: number;
  nextPageLink?: string;
  totalRecords: number;
}

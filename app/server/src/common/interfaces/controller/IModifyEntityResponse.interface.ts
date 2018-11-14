import { IHATEOSResponse } from './IHATEOSResponse.interface';

export interface IModifyEntityResponse extends IHATEOSResponse {
  ids: Array<string>;
}
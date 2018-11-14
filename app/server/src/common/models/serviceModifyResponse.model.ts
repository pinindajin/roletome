import { IServiceModifyEntityResponse } from '../interfaces/service';

export class ServiceModifyResponse implements IServiceModifyEntityResponse {
  ids: Array<string>;

  constructor(config?: Partial<ServiceModifyResponse>) {
    Object.assign(this, config);
  }
}
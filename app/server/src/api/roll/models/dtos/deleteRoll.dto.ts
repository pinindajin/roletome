import { IsUUID, IsDefined, IsArray, ArrayNotEmpty } from 'class-validator';
import { IModifyEntityResponse } from 'common/interfaces/controller/IModifyEntityResponse.interface';
import { Hyperlink } from 'common/models/hyperlink.model';

export class DeleteRollsRequest {
  @IsDefined()
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayNotEmpty()
  ids: Array<string>;

  constructor(config?: Partial<DeleteRollsRequest>) {
    Object.assign(this, config);
  }
}

export class DeleteRollsResponse implements IModifyEntityResponse {
  ids: Array<string>;

  links: Array<Hyperlink>;

  constructor(config?: Partial<DeleteRollsResponse>) {
    Object.assign(this, config);
  }
}

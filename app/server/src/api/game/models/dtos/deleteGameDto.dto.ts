import { IsUUID, IsDefined, IsArray, ArrayNotEmpty } from 'class-validator';
import { IModifyEntityResponse } from 'common/interfaces/controller/IModifyEntityResponse.interface';
import { Hyperlink } from 'common/models/hyperlink.model';

export class DeleteGamesRequest {
  @IsDefined()
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayNotEmpty()
  ids: Array<string>;

  constructor(config?: Partial<DeleteGamesRequest>) {
    Object.assign(this, config);
  }
}

export class DeleteGamesResponse implements IModifyEntityResponse {
  ids: Array<string>;

  links: Array<Hyperlink>;

  constructor(config?: Partial<DeleteGamesResponse>) {
    Object.assign(this, config);
  }
}

import {
  IsUUID,
  IsString,
  IsArray,
  ValidateNested,
  IsDefined,
  IsInstance,
  ArrayNotEmpty,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IModifyEntityResponse } from 'common/interfaces/controller/IModifyEntityResponse.interface';
import { Hyperlink } from 'common/models/hyperlink.model';

export class GameToUpdate {
  @IsDefined()
  @IsUUID('4')
  id: string;

  @IsString() name: string;

  @IsString() description: string;

  constructor(config?: Partial<GameToUpdate>) {
    Object.assign(this, config);
  }
}

export class UpdateGamesRequest {
  @ValidateNested({ each: true })
  @Type(() => GameToUpdate)
  @IsArray()
  @IsDefined()
  @IsInstance(GameToUpdate, { each: true })
  @ArrayNotEmpty()
  @ArrayMaxSize(100)
  gamesToUpdate: Array<GameToUpdate>;

  constructor(config?: Partial<UpdateGamesRequest>) {
    Object.assign(this, config);
  }
}

export class UpdateGamesResponse implements IModifyEntityResponse {
  ids: Array<string>;

  links: Array<Hyperlink>;

  constructor(config?: Partial<UpdateGamesResponse>) {
    Object.assign(this, config);
  }
}

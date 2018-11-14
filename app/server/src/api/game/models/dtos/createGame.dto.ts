import {
  IsString,
  IsArray,
  ValidateNested,
  IsDefined,
  IsInstance,
  ArrayNotEmpty,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IServiceModifyEntityResponse } from 'common/interfaces/service/IServiceModifyEntityResponse.interface';
import { IModifyEntityResponse } from 'common/interfaces/controller/IModifyEntityResponse.interface';
import { IHATEOSResponse } from 'common/interfaces/controller/IHATEOSResponse.interface';
import { Hyperlink } from 'common/models/hyperlink.model';

export class GameToCreate {
  @IsDefined()
  @IsString()
  name: string;

  @IsString() description: string;

  constructor(config?: Partial<GameToCreate>) {
    Object.assign(this, config);
  }
}

export class CreateGamesRequest {
  @ValidateNested({ each: true })
  @Type(() => GameToCreate)
  @IsArray()
  @IsDefined()
  @IsInstance(GameToCreate, { each: true })
  @ArrayNotEmpty()
  @ArrayMaxSize(100)
  gamesToCreate: Array<GameToCreate>;

  constructor(config?: Partial<CreateGamesRequest>) {
    Object.assign(this, config);
  }
}

export class CreateGamesResponse implements IModifyEntityResponse {
  ids: Array<string>;

  links: Array<Hyperlink>;

  constructor(config?: Partial<CreateGamesResponse>) {
    Object.assign(this, config);
  }
}

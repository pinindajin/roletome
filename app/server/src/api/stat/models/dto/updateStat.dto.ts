import {
  IsUUID,
  IsString,
  IsArray,
  ValidateNested,
  IsDefined,
  IsInstance,
  ArrayNotEmpty,
  ArrayMaxSize,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IModifyEntityResponse } from 'common/interfaces/controller/IModifyEntityResponse.interface';
import { Hyperlink } from 'common/models/hyperlink.model';

export class StatToUpdate {
  @IsDefined()
  @IsUUID('4')
  id: string;

  @IsInt() value: number;

  @IsString() name: string;

  @IsString() description: string;

  constructor(config?: Partial<StatToUpdate>) {
    Object.assign(this, config);
  }
}

export class UpdateStatsRequest {
  @ValidateNested({ each: true })
  @Type(() => StatToUpdate)
  @IsArray()
  @IsDefined()
  @IsInstance(StatToUpdate, { each: true })
  @ArrayNotEmpty()
  @ArrayMaxSize(100)
  statsToUpdate: Array<StatToUpdate>;

  constructor(config?: Partial<UpdateStatsRequest>) {
    Object.assign(this, config);
  }
}

export class UpdateStatsResponse implements IModifyEntityResponse {
  ids: Array<string>;

  links: Array<Hyperlink>;

  constructor(config?: Partial<UpdateStatsResponse>) {
    Object.assign(this, config);
  }
}

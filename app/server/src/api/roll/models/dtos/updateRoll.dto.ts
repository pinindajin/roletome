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

export class RollToUpdate {
  @IsDefined()
  @IsUUID('4')
  id: string;

  @IsString() name: string;

  @IsString() description: string;

  @IsString() value: string;

  constructor(config?: Partial<RollToUpdate>) {
    Object.assign(this, config);
  }
}

export class UpdateRollsRequest {
  @ValidateNested({ each: true })
  @Type(() => RollToUpdate)
  @IsArray()
  @IsDefined()
  @IsInstance(RollToUpdate, { each: true })
  @ArrayNotEmpty()
  @ArrayMaxSize(100)
  rollsToUpdate: Array<RollToUpdate>;

  constructor(config?: Partial<UpdateRollsRequest>) {
    Object.assign(this, config);
  }
}

export class UpdateRollsResponse implements IModifyEntityResponse {
  ids: Array<string>;

  links: Array<Hyperlink>;

  constructor(config?: Partial<UpdateRollsResponse>) {
    Object.assign(this, config);
  }
}

import {
  ValidateNested,
  IsArray,
  IsDefined,
  IsInstance,
  ArrayMaxSize,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsInt } from 'class-validator';
import { IServiceModifyEntityResponse } from 'common/interfaces/service/IServiceModifyEntityResponse.interface';
import { Hyperlink } from '../../../../common/models/hyperlink.model';

export class StatToCreate {
  @IsDefined()
  @IsInt()
  value: number;

  @IsDefined()
  @IsString()
  name: string;

  @IsString()
  description: string;

  constructor(config?: Partial<StatToCreate>) {
    Object.assign(this, config);
  }
}

export class CreateStatsRequest {
  @ValidateNested({ each: true })
  @Type(() => StatToCreate)
  @IsArray()
  @IsDefined()
  @IsInstance(StatToCreate, { each: true })
  @ArrayNotEmpty()
  @ArrayMaxSize(100)
  statsToCreate: Array<StatToCreate>;
}

export class CreateStatsResponse implements IServiceModifyEntityResponse {
  ids: Array<string>;

  links: Array<Hyperlink>;

  constructor(config?: Partial<CreateStatsResponse>) {
    Object.assign(this, config);
  }
}

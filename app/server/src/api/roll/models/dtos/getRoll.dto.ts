import { IsUUID, IsNotEmpty, IsInt, IsArray, IsDefined, IsPositive } from 'class-validator';
import { IPagedRequest } from 'common/interfaces/controller';
import { Transform } from 'class-transformer';
import { IPagedResponse } from 'common/interfaces/controller/IPagedResponse.interface';
import { Roll } from '../domain';

export class GetRollRequest {
  @IsDefined()
  @IsUUID('4')
  readonly id: string;

  constructor(config?: Partial<GetRollRequest>) {
    Object.assign(this, config);
  }
}

export class GetRollResponse {
  readonly roll: Roll;

  constructor(config?: Partial<GetRollResponse>) {
    Object.assign(this, config);
  }
}

export class GetRollsRequest implements IPagedRequest {
  @IsDefined()
  @Transform(x => +x)
  @IsInt()
  @IsPositive()
  pageSize: number = 100;

  @IsDefined()
  @Transform(x => +x)
  @IsInt()
  @IsPositive()
  pageOffset: number = 0;

  @IsArray()
  @IsUUID('4', { each: true })
  ids?: Array<string> = [];

  constructor(config?: Partial<GetRollsRequest>) {
    Object.assign(this, config);
  }
}

export class GetRollsResponse implements IPagedResponse {
  pageSize: number;

  pageNumber: number;

  nextPageLink: string;

  numberOfRecords: number;

  totalRecords: number;

  games: Array<Roll>;

  constructor(config?: Partial<GetRollsResponse>) {
    Object.assign(this, config);
  }
}

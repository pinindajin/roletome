import { IsUUID, IsNotEmpty, IsInt, IsArray, IsDefined, IsPositive } from 'class-validator';
import { IPagedRequest } from 'common/interfaces/controller';
import { Transform } from 'class-transformer';
import { IPagedResponse } from 'common/interfaces/controller/IPagedResponse.interface';
import { Stat } from '../domain';

export class GetStatRequest {
  @IsDefined()
  @IsUUID('4')
  readonly id: string;

  constructor(config?: Partial<GetStatRequest>) {
    Object.assign(this, config);
  }
}

export class GetStatResponse {
  readonly stat: Stat;

  constructor(config?: Partial<GetStatResponse>) {
    Object.assign(this, config);
  }
}

export class GetStatsRequest implements IPagedRequest {
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

  constructor(config?: Partial<GetStatsRequest>) {
    Object.assign(this, config);
  }
}

export class GetStatsResponse implements IPagedResponse {
  pageSize: number;

  pageNumber: number;

  nextPageLink: string;

  numberOfRecords: number;

  totalRecords: number;

  stats: Array<Stat>;

  constructor(config?: Partial<GetStatsResponse>) {
    Object.assign(this, config);
  }
}

import { IServiceFindResponse } from 'common/interfaces/service/IServiceFindResponse.interface';
import { Stat } from '../models/domain/stat.model';
import { IServiceModifyEntityResponse } from 'common/interfaces/service/IServiceModifyEntityResponse.interface';
import { CreateStatsRequest, UpdateStatsRequest, DeleteStatsRequest } from '../models/dto';
import { GetStatsRequest } from '../models/dto/getStat.dto';

export interface IStatService {
  find(request: GetStatsRequest): Promise<IServiceFindResponse<Stat>>;
  findOne(id: string): Promise<Stat>;
  create(request: CreateStatsRequest): Promise<IServiceModifyEntityResponse>;
  update(request: UpdateStatsRequest): Promise<IServiceModifyEntityResponse>;
  delete(request: DeleteStatsRequest): Promise<IServiceModifyEntityResponse>;
}

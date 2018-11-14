import { IServiceFindResponse } from 'common/interfaces/service/IServiceFindResponse.interface';
import { IServiceModifyEntityResponse } from 'common/interfaces/service/IServiceModifyEntityResponse.interface';
import { GetRollsRequest } from '../models/dtos/getRoll.dto';
import { Roll } from '../models/domain/roll.model';
import { CreateRollsRequest } from '../models/dtos/createRoll.dto';
import { UpdateRollsRequest } from '../models/dtos/updateRoll.dto';
import { DeleteRollsRequest } from '../models/dtos/deleteRoll.dto';

export interface IRollService {
  find(request: GetRollsRequest): Promise<IServiceFindResponse<Roll>>;
  findOne(id: string): Promise<Roll>;
  create(request: CreateRollsRequest): Promise<IServiceModifyEntityResponse>;
  update(request: UpdateRollsRequest): Promise<IServiceModifyEntityResponse>;
  delete(request: DeleteRollsRequest): Promise<IServiceModifyEntityResponse>;
}

import { Injectable, Inject } from '@nestjs/common';
import { IRollService } from '../interfaces/IRollService.interface';
import { ServiceFindResponse } from '../../../common/models/serviceFindResponse.model';
import { Roll } from '../models/domain/roll.model';
import { GetRollsRequest } from '../models/dtos/getRoll.dto';
import { CreateRollsRequest } from '../models/dtos/createRoll.dto';
import { ServiceModifyResponse } from '../../../common/models/serviceModifyResponse.model';
import { UpdateRollsRequest } from '../models/dtos/updateRoll.dto';
import { DeleteRollsRequest } from '../models/dtos/deleteRoll.dto';
import { IRollStore } from '../interfaces/IRollStore.interface';
import { StoreFindRequest } from '../../../common/models/storeFindRequest.model';

@Injectable()
export class RollService implements IRollService {
  constructor(@Inject('RollRepository') private readonly repo: IRollStore) {}

  async find(request: GetRollsRequest): Promise<ServiceFindResponse<Roll>> {
    const findResponse = await this.repo.find(
      new StoreFindRequest({
        pageOffset: request.pageOffset,
        pageSize: request.pageSize,
        ids: request.ids,
      }),
    );
    return new ServiceFindResponse<Roll>({
      values: findResponse.values,
      pageSize: findResponse.pageSize,
      pageNumber: findResponse.pageNumber,
      unfetchedIds: findResponse.unfetchedIds,
      moreRecords: findResponse.moreRecords,
      totalRecords: findResponse.totalRecords,
    });
  }

  async findOne(id: string): Promise<Roll> {
    return await this.repo.findOne(id);
  }

  async create(request: CreateRollsRequest): Promise<ServiceModifyResponse> {
    const rollsToCreate = request.rollsToCreate.map(_roll => {
      return new Roll({
        name: _roll.name,
        description: _roll.description,
        value: _roll.value,
      });
    });
    const saveResponse = await this.repo.create(rollsToCreate);
    return new ServiceModifyResponse({
      ids: saveResponse.values,
    });
  }

  async update(request: UpdateRollsRequest): Promise<ServiceModifyResponse> {
    const rollsToUpdate = request.rollsToUpdate.map(_roll => {
      return new Roll({
        id: _roll.id,
        name: _roll.name,
        description: _roll.description,
      });
    });
    const updateResponse = await this.repo.update(rollsToUpdate);
    return new ServiceModifyResponse({
      ids: updateResponse.values,
    });
  }

  async delete(request: DeleteRollsRequest): Promise<ServiceModifyResponse> {
    const rollsToDeleteIds = request.ids;
    const deleteResponse = await this.repo.delete(rollsToDeleteIds);
    return new ServiceModifyResponse({
      ids: deleteResponse.values,
    });
  }
}
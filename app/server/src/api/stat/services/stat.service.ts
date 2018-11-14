import { Injectable, Inject } from '@nestjs/common';
import { StoreFindRequest } from 'common/models/storeFindRequest.model';
import { ServiceFindResponse } from 'common/models/serviceFindResponse.model';
import { ServiceModifyResponse } from 'common/models/serviceModifyResponse.model';
import { IStatStore } from '../interfaces/IStatStore.interface';
import { IStatService } from '../interfaces/IStatService.interface';
import { GetStatsRequest, DeleteStatsRequest } from '../models/dto';
import { Stat } from '../models/domain/stat.model';
import { CreateStatsRequest } from '../models/dto/createStat.dto';
import { UpdateStatsRequest } from '../models/dto/updateStat.dto';

@Injectable()
export class StatService implements IStatService {
  constructor(@Inject('StatRepository') private readonly repo: IStatStore) {}

  async find(request: GetStatsRequest): Promise<ServiceFindResponse<Stat>> {
    const findResponse = await this.repo.find(
      new StoreFindRequest({
        pageOffset: request.pageOffset,
        pageSize: request.pageSize,
        ids: request.ids,
      }),
    );
    return new ServiceFindResponse<Stat>({
      values: findResponse.values,
      pageSize: findResponse.pageSize,
      pageNumber: findResponse.pageNumber,
      unfetchedIds: findResponse.unfetchedIds,
      moreRecords: findResponse.moreRecords,
      totalRecords: findResponse.totalRecords,
    });
  }

  async findOne(id: string): Promise<Stat> {
    return await this.repo.findOne(id);
  }

  async create(request: CreateStatsRequest): Promise<ServiceModifyResponse> {
    const statsToCreate = request.statsToCreate.map(_stat => {
      return new Stat({
        value: _stat.value,
        name: _stat.name,
        description: _stat.description,
      });
    });
    const saveResponse = await this.repo.create(statsToCreate);
    return new ServiceModifyResponse({
      ids: saveResponse.values,
    });
  }

  async update(request: UpdateStatsRequest): Promise<ServiceModifyResponse> {
    const statsToUpdate = request.statsToUpdate.map(_stat => {
      return new Stat({
        id: _stat.id,
        value: _stat.value,
        name: _stat.name,
        description: _stat.description,
      });
    });
    const updateResponse = await this.repo.update(statsToUpdate);
    return new ServiceModifyResponse({
      ids: updateResponse.values,
    });
  }

  async delete(request: DeleteStatsRequest): Promise<ServiceModifyResponse> {
    const statsToDeleteIds = request.ids;
    const deleteResponse = await this.repo.delete(statsToDeleteIds);
    return new ServiceModifyResponse({
      ids: deleteResponse.values,
    });
  }
}

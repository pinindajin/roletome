import { Injectable, Inject } from '@nestjs/common';
import {
  GetGamesRequest,
  GetGamesResponse,
  GetGameResponse,
  UpdateGamesRequest,
  UpdateGamesResponse,
  DeleteGamesRequest,
  DeleteGamesResponse,
  CreateGamesRequest,
  CreateGamesResponse,
} from '../models/dtos';
import { IGameService, IGameStore } from '../interfaces';
import { Game } from '../models/domain/game.model';
import { StoreFindRequest } from '../../../common/models/storeFindRequest.model';
import { ServiceFindResponse } from '../../../common/models/serviceFindResponse.model';
import { ServiceModifyResponse } from '../../../common/models/serviceModifyResponse.model';

@Injectable()
export class GameService implements IGameService {
  constructor(@Inject('GameStore') private readonly repo: IGameStore) { }

  async find(request: GetGamesRequest): Promise<ServiceFindResponse<Game>> {
    const findResponse = await this.repo.find(
      new StoreFindRequest({
        pageOffset: request.pageOffset,
        pageSize: request.pageSize,
        ids: request.ids,
      }),
    );

    return new ServiceFindResponse<Game>({
      values: findResponse.values,
      pageSize: findResponse.pageSize,
      pageNumber: findResponse.pageNumber,
      unfetchedIds: findResponse.unfetchedIds,
      moreRecords: findResponse.moreRecords,
      totalRecords: findResponse.totalRecords,
    });
  }

  async findOne(id: string): Promise<Game> {
    return await this.repo.findOne(id);
  }

  async create(request: CreateGamesRequest): Promise<ServiceModifyResponse> {
    const gamesToCreate = request.gamesToCreate.map(_game => {
      return new Game({
        name: _game.name,
        description: _game.description,
      });
    });
    const saveResponse = await this.repo.create(gamesToCreate);
    return new ServiceModifyResponse({
      ids: saveResponse.values,
    });
  }

  async update(request: UpdateGamesRequest): Promise<ServiceModifyResponse> {
    const gamesToUpdate = request.gamesToUpdate.map(_game => {
      return new Game({
        id: _game.id,
        name: _game.name,
        description: _game.description,
      });
    });
    const updateResponse = await this.repo.update(gamesToUpdate);
    return new ServiceModifyResponse({
      ids: updateResponse.values,
    });
  }

  async delete(request: DeleteGamesRequest): Promise<ServiceModifyResponse> {
    const gamesToDeleteIds = request.ids;
    const deleteResponse = await this.repo.delete(gamesToDeleteIds);
    return new ServiceModifyResponse({
      ids: deleteResponse.values,
    });
  }
}

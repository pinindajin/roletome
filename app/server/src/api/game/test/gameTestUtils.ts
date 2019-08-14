import { Game } from '../models/domain/game.model';
import { IGameService } from '../interfaces/IGameService.interface';
import { ServiceFindResponse } from '../../../common/models/serviceFindResponse.model';
import { GetGamesRequest } from '../models/dtos/getGame.dto';
import {
  CreateGamesRequest,
  CreateGamesResponse,
} from '../models/dtos/createGame.dto';
import { UpdateGamesRequest, DeleteGamesRequest } from '../models/dtos';
import { UpdateGamesResponse } from '../models/dtos/updateGame.dto';
import { DeleteGamesResponse } from '../models/dtos/deleteGameDto.dto';
import { IGameStore } from '../interfaces';
import {
  IStoreFindRequest,
  IStoreFindResponse,
  IStoreSaveResponse,
} from '../../../common/interfaces/store';
import { StoreFindResponse } from '../../../common/models/storeFindResponse.model';
import { StoreSaveResponse } from '../../../common/models/storeSaveResponse.model';
import { ServiceModifyResponse } from '../../../common/models/serviceModifyResponse.model';

export class MockGameService implements IGameService {
  async create(request: CreateGamesRequest): Promise<ServiceModifyResponse> {
    return new ServiceModifyResponse();
  }

  async delete(request: DeleteGamesRequest): Promise<ServiceModifyResponse> {
    return new ServiceModifyResponse();
  }

  async find(request: GetGamesRequest): Promise<ServiceFindResponse<Game>> {
    return new ServiceFindResponse();
  }

  async findOne(id: string): Promise<Game> {
    return new Game();
  }

  async update(request: UpdateGamesRequest): Promise<ServiceModifyResponse> {
    return new ServiceModifyResponse();
  }
}

export class MockGameStore implements IGameStore {
  async find(ids: IStoreFindRequest): Promise<IStoreFindResponse<Game>> {
    return new StoreFindResponse();
  }

  async findOne(id: string): Promise<Game> {
    return new Game();
  }

  async create(games: Array<Game>): Promise<IStoreSaveResponse<string>> {
    return new StoreSaveResponse();
  }

  async update(games: Array<Game>): Promise<IStoreSaveResponse<string>> {
    return new StoreSaveResponse();
  }

  async delete(ids: Array<string>): Promise<IStoreSaveResponse<string>> {
    return new StoreSaveResponse();
  }
}

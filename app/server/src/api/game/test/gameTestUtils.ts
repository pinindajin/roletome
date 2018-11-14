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

export class MockGameService implements IGameService {
  async find(request: GetGamesRequest): Promise<ServiceFindResponse<Game>> {
    return new ServiceFindResponse();
  }

  async findOne(id: string): Promise<Game> {
    return new Game();
  }

  async create(request: CreateGamesRequest): Promise<CreateGamesResponse> {
    return new CreateGamesResponse();
  }

  async update(request: UpdateGamesRequest): Promise<UpdateGamesResponse> {
    return new UpdateGamesResponse();
  }

  async delete(request: DeleteGamesRequest): Promise<DeleteGamesResponse> {
    return new DeleteGamesResponse();
  }
}

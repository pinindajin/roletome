import { IServiceFindResponse } from 'common/interfaces/service/IServiceFindResponse.interface';
import { Game } from '../models/domain/game.model';
import { IServiceModifyEntityResponse } from 'common/interfaces/service/IServiceModifyEntityResponse.interface';
import {
  GetGamesRequest,
  GetGameResponse,
  DeleteGamesResponse,
  DeleteGamesRequest,
  CreateGamesRequest,
  CreateGamesResponse,
  UpdateGamesRequest,
  UpdateGamesResponse,
} from '../models/dtos';

export interface IGameService {
  find(request: GetGamesRequest): Promise<IServiceFindResponse<Game>>;
  findOne(id: string): Promise<Game>;
  create(request: CreateGamesRequest): Promise<IServiceModifyEntityResponse>;
  update(request: UpdateGamesRequest): Promise<IServiceModifyEntityResponse>;
  delete(request: DeleteGamesRequest): Promise<IServiceModifyEntityResponse>;
}

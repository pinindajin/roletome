import {
  Get,
  Controller,
  Post,
  Delete,
  Param,
  Body,
  Query,
  ValidationPipe,
  Inject,
  Put,
} from '@nestjs/common';
import {
  GetGamesRequest,
  GetGamesResponse,
  CreateGamesRequest,
  UpdateGamesRequest,
  DeleteGamesRequest,
  UpdateGamesResponse,
  DeleteGamesResponse,
} from '../models/dtos';
import { ValidateUUIDPipe } from '../../../common/pipes/validate-uuid.pipe';
import { IGameService } from '../interfaces';
import { GetGameResponse } from '../models/dtos/getGame.dto';
import { CreateGamesResponse } from '../models/dtos/createGame.dto';
import { Hyperlink } from '../../../common/models/hyperlink.model';
import { HTTPVERB } from '../../../common/models/httpVerb.type';
import { ICRUDController } from '../../../common/interfaces/controller/ICrudController.interface';
import { APPCONFIGKEYS, APP_CONFIG } from '../../../config/appConfig.config';

// dev
const x = console.log;

@Controller(`api/${APP_CONFIG.CONTROLLER_CONFIGS.get(APPCONFIGKEYS.GAME_ENDPOINT)}`)
export class GameController implements ICRUDController {
  constructor(@Inject('GAME_SERVICE') private readonly service: IGameService) {}

  @Get()
  async find(
    @Query(new ValidationPipe({ transform: true }))
    request: GetGamesRequest,
  ): Promise<GetGamesResponse> {
    const serviceResponse = await this.service.find(request);

    return new GetGamesResponse({
      games: serviceResponse.values,
      pageNumber: serviceResponse.pageNumber,
      pageSize: serviceResponse.pageSize,
      numberOfRecords: serviceResponse.values ? serviceResponse.values.length : 0,
      totalRecords: serviceResponse.totalRecords,
      nextPageLink:
        serviceResponse.moreRecords === true
          ? this.buildGamesNextPageLink(
              serviceResponse.pageSize,
              serviceResponse.pageNumber,
              serviceResponse.unfetchedIds,
            )
          : null,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id', new ValidateUUIDPipe())
    id: string,
  ): Promise<GetGameResponse> {
    const result = await this.service.findOne(id);
    return new GetGameResponse({
      game: result,
    });
  }

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true, skipMissingProperties: true }))
    request: CreateGamesRequest,
  ): Promise<CreateGamesResponse> {
    const result = await this.service.create(request);
    return new CreateGamesResponse({
      ids: result.ids,
      links: [
        new Hyperlink({
          href: `${APP_CONFIG.APP_DOMAIN}:${APP_CONFIG.APP_PORT}/api/${APP_CONFIG.CONTROLLER_CONFIGS.get(APPCONFIGKEYS.GAME_ENDPOINT)}`,
          rel: `self`,
          type: HTTPVERB.GET,
        }),
      ],
    });
  }

  @Put()
  async update(
    @Body(new ValidationPipe({ transform: true, skipMissingProperties: true }))
    request: UpdateGamesRequest,
  ): Promise<UpdateGamesResponse> {
    const result = await this.service.update(request);
    return new UpdateGamesResponse({
      ids: result.ids,
      links: [
        new Hyperlink({
          href: `${APP_CONFIG.APP_DOMAIN}:${APP_CONFIG.APP_PORT}/api/${APP_CONFIG.CONTROLLER_CONFIGS.get(APPCONFIGKEYS.GAME_ENDPOINT)}`,
          rel: `self`,
          type: HTTPVERB.GET,
        }),
      ],
    });
  }

  @Delete()
  async delete(
    @Body(new ValidationPipe({ transform: true }))
    request: DeleteGamesRequest,
  ): Promise<DeleteGamesResponse> {
    const result = await this.service.delete(request);
    return new DeleteGamesResponse({
      ids: result.ids,
      links: [
        new Hyperlink({
          href: `${APP_CONFIG.APP_DOMAIN}:${APP_CONFIG.APP_PORT}/api/${APP_CONFIG.CONTROLLER_CONFIGS.get(APPCONFIGKEYS.GAME_ENDPOINT)}`,
          rel: `self`,
          type: HTTPVERB.GET,
        }),
      ],
    });
  }

  private buildGamesNextPageLink(
    pageSize: number,
    pageNumber: number,
    ids: Array<string>,
  ): string {
    const baseLink = `api/game?pageSize=${pageSize}&pageOffset=${pageNumber *
      pageSize}`;
    if (ids && ids.length > 0) {
      const urlEncodedIds = ids.map(id => `&ids[]=${id}`);
      return `${baseLink}${urlEncodedIds}`;
    } else return baseLink;
  }
}

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
  HttpCode,
} from '@nestjs/common';

import { ValidateUUIDPipe } from 'common/pipes/validate-uuid.pipe';
import { IServiceModifyEntityResponse } from 'common/interfaces/service/IServiceModifyEntityResponse.interface';
import { Hyperlink } from 'common/models/hyperlink.model';
import { HTTPVERB } from 'common/models/httpVerb.type';
import { ICRUDController } from 'common/interfaces/controller/ICrudController.interface';
import { APPCONFIGKEYS, APP_CONFIG } from 'config/appConfig.config';
import { GetStatsRequest, GetStatsResponse, GetStatResponse } from '../models/dto';
import { CreateStatsRequest, CreateStatsResponse } from '../models/dto/createStat.dto';
import { UpdateStatsRequest, UpdateStatsResponse } from '../models/dto/updateStat.dto';
import { DeleteStatsRequest, DeleteStatsResponse } from '../models/dto/deleteStat.dto';
import { IStatService } from '../interfaces/IStatService.interface';

// dev
const x = console.log;

@Controller(`api/${APP_CONFIG.CONTROLLER_CONFIGS.get(APPCONFIGKEYS.STAT_ENDPOINT)}`)
export class StatController implements ICRUDController {
  constructor(
    @Inject('StatService') private readonly service: IStatService,
  ) {}

  @Get()
  async find(
    @Query(new ValidationPipe({ transform: true }))
    request: GetStatsRequest,
  ): Promise<GetStatsResponse> {
    const serviceResponse = await this.service.find(request);

    return new GetStatsResponse({
      stats: serviceResponse.values,
      pageNumber: serviceResponse.pageNumber,
      pageSize: serviceResponse.pageSize,
      numberOfRecords: serviceResponse.values ? serviceResponse.values.length : 0,
      totalRecords: serviceResponse.totalRecords,
      nextPageLink:
        serviceResponse.moreRecords === true
          ? this.buildStatsNextPageLink(
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
  ): Promise<GetStatResponse> {
    const result = await this.service.findOne(id);
    return new GetStatResponse({
      stat: result,
    });
  }

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true, skipMissingProperties: true }))
    request: CreateStatsRequest,
  ): Promise<CreateStatsResponse> {
    const result = await this.service.create(request);
    return new CreateStatsResponse({
      ids: result.ids,
      links: [
        new Hyperlink({
          href: `${APP_CONFIG.APP_DOMAIN}:${APP_CONFIG.APP_PORT}/api/${APP_CONFIG.CONTROLLER_CONFIGS.get(APPCONFIGKEYS.STAT_ENDPOINT)}`,
          rel: `self`,
          type: HTTPVERB.GET,
        }),
      ],
    });
  }

  @Put()
  async update(
    @Body(new ValidationPipe({ transform: true, skipMissingProperties: true }))
    request: UpdateStatsRequest,
  ): Promise<UpdateStatsResponse> {
    const result = await this.service.update(request);
    return new UpdateStatsResponse({
      ids: result.ids,
      links: [
        new Hyperlink({
          href: `${APP_CONFIG.APP_DOMAIN}:${APP_CONFIG.APP_PORT}/api/${APP_CONFIG.CONTROLLER_CONFIGS.get(APPCONFIGKEYS.STAT_ENDPOINT)}`,
          rel: `self`,
          type: HTTPVERB.GET,
        }),
      ],
    });
  }

  @Delete()
  async delete(
    @Body(new ValidationPipe({ transform: true }))
    request: DeleteStatsRequest,
  ): Promise<DeleteStatsResponse> {
    const result = await this.service.delete(request);
    return new DeleteStatsResponse({
      ids: result.ids,
      links: [
        new Hyperlink({
          href: `${APP_CONFIG.APP_DOMAIN}:${APP_CONFIG.APP_PORT}/api/${APP_CONFIG.CONTROLLER_CONFIGS.get(APPCONFIGKEYS.STAT_ENDPOINT)}`,
          rel: `self`,
          type: HTTPVERB.GET,
        }),
      ],
    });
  }

  private buildStatsNextPageLink(
    pageSize: number,
    pageNumber: number,
    ids: Array<string>,
  ): string {
    const baseLink = `api/stat?pageSize=${pageSize}&pageOffset=${pageNumber *
      pageSize}`;
    if (ids && ids.length > 0) {
      const urlEncodedIds = ids.map(id => `&ids[]=${id}`);
      return `${baseLink}${urlEncodedIds}`;
    } else return baseLink;
  }
}

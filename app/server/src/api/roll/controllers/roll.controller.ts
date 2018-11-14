import { ICRUDController } from 'common/interfaces/controller/ICrudController.interface';
import { Controller, Inject, Query, ValidationPipe, Get, Body, Post } from '@nestjs/common';
import { APPCONFIGKEYS, APP_CONFIG } from 'config/appConfig.config';
import { RollService } from '../services/roll.service';
import { GetRollsResponse, GetRollsRequest } from '../models/dtos/getRoll.dto';
import { Roll } from '../models/domain/roll.model';
import { ValidateUUIDPipe } from 'common/pipes/validate-uuid.pipe';
import { DeleteRollsRequest, DeleteRollsResponse } from '../models/dtos/deleteRoll.dto';
import { CreateRollsRequest, CreateRollsResponse } from '../models/dtos/createRoll.dto';
import { UpdateRollsRequest, UpdateRollsResponse } from '../models/dtos/updateRoll.dto';
import { Hyperlink } from 'common/models/hyperlink.model';
import { HTTPVERB } from 'common/models/httpVerb.type';

@Controller(`api/${APP_CONFIG.CONTROLLER_CONFIGS.get(APPCONFIGKEYS.ROLL_ENDPOINT)}`)
export class RollController implements ICRUDController {
  constructor(
    @Inject('RollService') private readonly service: RollService,
  ) {}

  @Get()
  async find(@Query(
    new ValidationPipe({ transform: true }))
    request: GetRollsRequest,
  ): Promise<GetRollsResponse> {
    return new GetRollsResponse();
  }

  @Get(':id')
  async findOne(
    @Query('id', new ValidateUUIDPipe())
    request: string,
  ): Promise<Roll> {
    return new Roll();
  }

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true, skipMissingProperties: true }))
    request: CreateRollsRequest,
  ): Promise<CreateRollsResponse> {
    const result = await this.service.create(request);
    return new CreateRollsResponse({
      ids: result.ids,
      links: [
        new Hyperlink({
          href: `${APP_CONFIG.APP_DOMAIN}:${APP_CONFIG.APP_PORT}/api/${APP_CONFIG.CONTROLLER_CONFIGS.get(APPCONFIGKEYS.ROLL_ENDPOINT)}`,
          rel: `self`,
          type: HTTPVERB.GET,
        }),
      ],
    });
  }

  async update(
    @Body(new ValidationPipe({ transform: true, skipMissingProperties: true }))
    request: UpdateRollsRequest,
  ): Promise<UpdateRollsResponse> {
    return new UpdateRollsResponse();
  }

  async delete(
    @Body(new ValidationPipe({ transform: true }))
    request: DeleteRollsRequest,
  ): Promise<DeleteRollsResponse> {
    return new DeleteRollsResponse();
  }
}
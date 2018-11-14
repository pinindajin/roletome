import { GameStore } from './game.store';
import { MockGameStore } from '../test/gameTestUtils';
import { getMockGames } from '../test/data/';
import { Test } from '@nestjs/testing';
import each from 'jest-each';
import { StoreFindResponse } from '../../../common/models/storeFindResponse.model';
import { GetGamesRequest, GetGameRequest } from '../models/dtos/getGame.dto';
import { Game } from '../models/domain/game.model';
import { ServiceFindResponse } from '../../../common/models/serviceFindResponse.model';
import 'jest';
import { CreateGamesRequest, GameToCreate } from '../models/dtos';
import { ServiceModifyResponse } from '../../../common/models/serviceModifyResponse.model';
import { StoreSaveResponse } from '../../../common/models/storeSaveResponse.model';
import {
  UpdateGamesRequest,
  GameToUpdate,
} from '../models/dtos/updateGame.dto';
import { DeleteGamesRequest } from '../models/dtos/deleteGameDto.dto';
import { Repository } from 'typeorm';
import { DbGame } from '../../../db/typeOrm/dbModels/game/game.entity';
import { StoreFindRequest } from '../../../common/models/storeFindRequest.model';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('GameService', () => {
  let gameStore: GameStore;
  let mockRepository: Repository<DbGame>;
  const mockGames = getMockGames();
  const appDomain = process.env.APP_DOMAIN;
  const appPort = process.env.APP_PORT;
  const gameEndpoint = process.env.GAME_ENDPOINT;

  beforeAll(async () => {
    const mockGameRepoProvider = {
      provide: getRepositoryToken(DbGame),
      useClass: Repository,
    };

    const app = await Test.createTestingModule({
      providers: [GameStore, mockGameRepoProvider],
    }).compile();

    gameStore = app.get<GameStore>(GameStore);
    mockRepository = app.get<Repository<DbGame>>(getRepositoryToken(DbGame));
  });

  describe('find', async () => {
    const testCases = [
      [
        new StoreFindRequest({
          pageOffset: 0,
          pageSize: 5,
        }) ,
        [
          [
          ],
          5,
        ],
        new StoreFindResponse<Game>({
          pageSize: 5,
          pageNumber: 1,
          values: [],
          moreRecords: false,
          totalRecords: 5,
        }),
      ],
    ];

    each(testCases).it(
      'should page correctly',
      async (
        request: StoreFindRequest,
        mockResponse: [DbGame[], number],
        expected: StoreFindResponse<Game>,
      ) => {
        // arrange
        jest
          .spyOn(gameStore, 'repoFind')
          .mockImplementation(() => mockResponse);

        // act
        const result = await gameStore.find(request);

        // assert
        expect(result).toEqual(expected);
      },
    );
  });
});

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
        }),
        [
          mockGames.slice(10, 15).map(g => new DbGame({
            id: g.id,
            name: g.name,
            description: g.description,
          })),
          mockGames.length,
        ],
        new StoreFindResponse<Game>({
          pageSize: 5,
          pageNumber: 1,
          values: mockGames.slice(10, 15),
          moreRecords: true,
          totalRecords: mockGames.length,
        }),
      ],
      [
        new StoreFindRequest({
          pageOffset: 150,
          pageSize: 50,
        }),
        [
          mockGames.slice(150).map(g => new DbGame({
            id: g.id,
            name: g.name,
            description: g.description,
          })),
          mockGames.length,
        ],
        new StoreFindResponse<Game>({
          pageSize: 36,
          pageNumber: 4,
          values: mockGames.slice(150),
          moreRecords: false,
          totalRecords: mockGames.length,
        }),
      ],
    ];

    each(testCases).it('should page correctly', async (
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

  describe('findByIds', async () => {
    const testCases = [
      [
        new StoreFindRequest({
          ids: [...mockGames.slice(50, 65).map(g => g.id)],
          pageSize: 100,
          pageOffset: 0,
        }),
        [
          [...mockGames.slice(50, 65).map(g => new DbGame({
            id: g.id,
            name: g.name,
            description: g.description,
          }))],
          15,
        ],
        new StoreFindResponse<Game>({
          pageSize: 15,
          pageNumber: 1,
          values: mockGames.slice(50, 65),
          unfetchedIds: [],
          moreRecords: false,
          totalRecords: 15,
        }),
      ],
    ];

    each(testCases).it('should retrieve correct records', async (
        request: StoreFindRequest,
        mockResponse: [DbGame[], number],
        expected: StoreFindResponse<Game>,
    ) => {
      // arrange
      jest
        .spyOn(gameStore, 'repoFindByIds')
        .mockImplementation(() => mockResponse);

      // act
      const result = await gameStore.find(request);

      // assert
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', async () => {
    const testCases = [
      [
        mockGames[55].id,
        new DbGame({
          id: mockGames[55].id,
          name: mockGames[55].name,
          description: mockGames[55].description,
        }),
        mockGames[55],
      ],
      [
        '41b61362-4531-4d20-8ebb-974fc59175ec',
        null,
        null,
      ],
    ];

    each(testCases).it('should return correct record', async (
      request: string,
      mockResponse: DbGame,
      expected: StoreFindResponse<Game>,
    ) => {
      // arrange
      jest
        .spyOn(mockRepository, 'findOne')
        .mockImplementation(() => mockResponse);

      // act
      const result = await gameStore.findOne(request);

      // assert
      expect(result).toEqual(expected);
    });
  });
});

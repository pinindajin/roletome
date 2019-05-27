import { Module, Provider } from '@nestjs/common';
import { GameController } from './controllers/game.controller';
import { GameService, gameServiceProvider } from './services/game.service';
import { GameStore, gameStoreProvider } from './stores/game.store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbGame } from '../../db/typeOrm/dbModels/game/game.entity';
import { IGameServiceProvider, IGameStoreProvider } from './game-providers';
import { uuidProvider } from '@common/functions/function-providers';

@Module({
  imports: [TypeOrmModule.forFeature([DbGame])],
  controllers: [GameController],
  providers: [gameServiceProvider, gameStoreProvider, uuidProvider],
})
export class GameModule {}

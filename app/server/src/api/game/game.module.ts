import { Module, Provider } from '@nestjs/common';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { GameStore } from './stores/game.store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbGame } from '../../db/typeOrm/dbModels/game/game.entity';

const gameServiceProvider: Provider = {
  provide: 'GameService',
  useClass: GameService,
};

const gameStoreProvider: Provider = {
  provide: 'GameStore',
  useClass: GameStore,
};

const dbEntityImports = [DbGame];

@Module({
  imports: [TypeOrmModule.forFeature(dbEntityImports)],
  controllers: [GameController],
  providers: [gameServiceProvider, gameStoreProvider],
})
export class GameModule {}

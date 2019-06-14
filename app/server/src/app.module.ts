import { Module } from '@nestjs/common';
import { GameModule } from './api/game/game.module';
import { bootstrapTypeOrm, typeOrmPostgresConfig } from './db/typeOrm';

@Module({
  imports: [
    GameModule,
    bootstrapTypeOrm(typeOrmPostgresConfig),
  ],
})
export class AppModule {}

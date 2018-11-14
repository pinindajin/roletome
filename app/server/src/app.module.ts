import { Module } from '@nestjs/common';
import { GameModule } from 'api/game/game.module';
import { bootstrapTypeOrm, typeOrmPostgresConfig } from 'db/typeOrm';
import { RollModule } from 'api/roll/roll.module';

@Module({
  imports: [
    GameModule,
    RollModule,
    bootstrapTypeOrm(typeOrmPostgresConfig),
  ],
})
export class AppModule {}

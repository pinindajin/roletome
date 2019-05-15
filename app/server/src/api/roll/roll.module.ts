import { Module, Provider } from '@nestjs/common';
import { DbRoll } from '../../db/typeOrm/dbModels/roll/roll.entity';
import { RollService } from './services/roll.service';
import { RollStore } from './stores/roll.store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RollController } from './controllers/roll.controller';

const rollServiceProvider: Provider = {
  provide: 'RollService',
  useClass: RollService,
};

const rollStoreProvider: Provider = {
  provide: 'RollRepository',
  useClass: RollStore,
};

const dbEntityImports = [DbRoll];

@Module({
  imports: [TypeOrmModule.forFeature(dbEntityImports)],
  controllers: [RollController],
  providers: [rollServiceProvider, rollStoreProvider],
})
export class RollModule {}

import { Module, Provider } from '@nestjs/common';
import { StatService } from './services/stat.service';
import { StatStore } from './stores/stat.store';
import { StatController } from './controllers/stat.controller';
import { AppConfigModule } from 'config/appConfig.module';
import { TypeOrmModule } from '../../../node_modules/@nestjs/typeorm';
import { DbStat } from '../../db/typeOrm/dbModels/stat/stat.entity';

const statServiceProvider: Provider = {
  provide: 'StatService',
  useClass: StatService,
};

const statStoreProvider: Provider = {
  provide: 'StatStore',
  useClass: StatStore,
};

const dbEntityImports = [DbStat];
@Module({
  imports: [TypeOrmModule.forFeature(dbEntityImports), AppConfigModule],
  controllers: [StatController],
  providers: [statServiceProvider, statStoreProvider],
})
export class StatModule {}

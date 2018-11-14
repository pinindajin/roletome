import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreSaveResponse } from 'common/models/storeSaveResponse.model';
import { StoreFindResponse } from 'common/models/storeFindResponse.model';
import { StoreFindRequest } from 'common/models/storeFindRequest.model';
import { Injectable } from '@nestjs/common';
import { json } from 'body-parser';
import { v4 as uuid } from 'uuid';
import { IStatStore } from '../interfaces/IStatStore.interface';
import { DbStat } from '../../../db/typeOrm/dbModels/stat/stat.entity';
import { Stat } from '../models/domain';

@Injectable()
export class StatStore implements IStatStore {
  constructor(
    @InjectRepository(DbStat) private readonly store: Repository<DbStat>,
  ) {}

  async find(request: StoreFindRequest): Promise<StoreFindResponse<Stat>> {
    try {
      if (request.ids && request.ids.length > 0) {
        const [dbStats, count] = await this.store
          .createQueryBuilder()
          .select('stat')
          .from(DbStat, 'stat')
          .where('stat.id IN (:...ids)', { ids: request.ids })
          .skip(request.pageOffset)
          .take(request.pageSize)
          .getManyAndCount();
        const stats = dbStats.map(dbStat => {
          return new Stat({
            id: dbStat.id,
            value: dbStat.value,
            name: dbStat.name,
            description: dbStat.description,
          });
        });
        const fethcedIds = stats.map(stat => stat.id);
        const unfetchedIds = request.ids
          .filter(id => !fethcedIds.includes(id));
        return new StoreFindResponse<Stat>({
          pageNumber: (Math.ceil(request.pageOffset / request.pageSize) + 1),
          pageSize: request.pageSize,
          totalRecords: count,
          values: stats,
          unfetchedIds,
          moreRecords: (request.pageOffset + request.pageSize) < count,
        });
      } else {
        const [dbStats, count] = await this.store
          .createQueryBuilder('stat')
          .skip(request.pageOffset)
          .take(request.pageSize)
          .getManyAndCount();
        const stats = dbStats.map(dbStat => {
          return new Stat({
            id: dbStat.id,
            value: dbStat.value,
            name: dbStat.name,
            description: dbStat.description,
          });
        });
        return new StoreFindResponse<Stat>({
          pageNumber: (Math.ceil(request.pageOffset / request.pageSize) + 1),
          pageSize: request.pageSize,
          totalRecords: count,
          values: stats,
          moreRecords: (request.pageOffset + request.pageSize) < count,
        });
      }
    }
    catch (err) {
      this.logAndThrow(err);
    }
  }

  async findOne(id: string): Promise<Stat> {
    try {
      const dbStat = await this.store.findOne({
        id,
      });
      if (dbStat) {
        return new Stat({
          id: dbStat.id,
          name: dbStat.name,
          description: dbStat.description,
        });
      } else {
        return null;
      }
    }
    catch (err) {
      this.logAndThrow(err);
    }
  }

  async create(stats: Array<Stat>): Promise<StoreSaveResponse<string>> {
    try {
      const dbStats = stats.map(_stat => {
        return new DbStat({
          id: uuid(),
          value: _stat.value,
          name: _stat.name,
          description: _stat.description,
        });
      });
      const saveResult = await this.store.save(dbStats);
      return new StoreSaveResponse<string>({
        values: saveResult.map(result => result.id),
      });
    } catch (err) {
      this.logAndThrow(err);
    }
  }

  async update(stats: Array<Stat>): Promise<StoreSaveResponse<string>> {
    try {
      const savedStats = stats
        .filter(async stat => {
          const statToUpdate = await this.store.findOne({ id: stat.id });
          if (statToUpdate) {
            statToUpdate.value = stat.value;
            statToUpdate.name = stat.name;
            statToUpdate.description = stat.description;
            this.store.save(stat);
            return true;
          }
        });
      const savedIds = savedStats.map(savedStat => {
        return savedStat.id;
      });
      return new StoreSaveResponse<string>({
        values: savedIds,
      });
    }
    catch (err) {
      this.logAndThrow(err);
    }
  }

  async delete(ids: Array<string>): Promise<StoreSaveResponse<string>> {
    try {
      const deletedStatIds = ids
        .filter(async id => {
          const statToDelete = await this.store.findOne({ id });
          if (statToDelete) {
            this.store.remove(statToDelete);
            return true;
          }
        });
      return new StoreSaveResponse<string>({
        values: ids,
      });
    }
    catch (err) {
      this.logAndThrow(err);
    }
  }

  // Temp Function
  private logAndThrow(err) {
    const l = console.log;
    l('StatStore: ' + err);
    throw err;
  }
}

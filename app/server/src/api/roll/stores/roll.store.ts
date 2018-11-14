import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreSaveResponse } from 'common/models/storeSaveResponse.model';
import { StoreFindResponse } from 'common/models/storeFindResponse.model';
import { StoreFindRequest } from 'common/models/storeFindRequest.model';
import { Injectable } from '@nestjs/common';
import { json } from 'body-parser';
import { v4 as uuid } from 'uuid';
import { IRollStore } from '../interfaces/IRollStore.interface';
import { DbRoll } from 'db/typeOrm/dbModels/roll/roll.entity';
import { Roll } from '../models/domain/roll.model';

@Injectable()
export class RollStore implements IRollStore {
  constructor(
    @InjectRepository(DbRoll) private readonly store: Repository<DbRoll>,
  ) {}

  async find(request: StoreFindRequest): Promise<StoreFindResponse<Roll>> {
    try {
      if (request.ids && request.ids.length > 0) {
        const [dbRolls, count] = await this.store
          .createQueryBuilder()
          .select('roll')
          .from(DbRoll, 'roll')
          .where('roll.id IN (:...ids)', { ids: request.ids })
          .skip(request.pageOffset)
          .take(request.pageSize)
          .getManyAndCount();
        const rolls = dbRolls.map(dbRoll => {
          return new Roll({
            id: dbRoll.id,
            name: dbRoll.name,
            description: dbRoll.description,
          });
        });
        const fethcedIds = rolls.map(roll => roll.id);
        const unfetchedIds = request.ids
          .filter(id => !fethcedIds.includes(id));
        return new StoreFindResponse<Roll>({
          pageNumber: (Math.ceil(request.pageOffset / request.pageSize) + 1),
          pageSize: request.pageSize,
          totalRecords: count,
          values: rolls,
          unfetchedIds,
          moreRecords: (request.pageOffset + request.pageSize) < count,
        });
      } else {
        const [dbRolls, count] = await this.store
          .createQueryBuilder('roll')
          .skip(request.pageOffset)
          .take(request.pageSize)
          .getManyAndCount();
        const rolls = dbRolls.map(dbRoll => {
          return new Roll({
            id: dbRoll.id,
            name: dbRoll.name,
            description: dbRoll.description,
          });
        });
        return new StoreFindResponse<Roll>({
          pageNumber: (Math.ceil(request.pageOffset / request.pageSize) + 1),
          pageSize: request.pageSize,
          totalRecords: count,
          values: rolls,
          moreRecords: (request.pageOffset + request.pageSize) < count,
        });
      }
    }
    catch (err) {
      this.logAndThrow(err);
    }
  }

  async findOne(id: string): Promise<Roll> {
    try {
      const dbRoll = await this.store.findOne({
        id,
      });
      if (dbRoll) {
        return new Roll({
          id: dbRoll.id,
          name: dbRoll.name,
          description: dbRoll.description,
        });
      } else {
        return null;
      }
    }
    catch (err) {
      this.logAndThrow(err);
    }
  }

  async create(rolls: Array<Roll>): Promise<StoreSaveResponse<string>> {
    try {
      const dbRolls = rolls.map(_roll => {
        return new DbRoll({
          id: uuid(),
          name: _roll.name,
          description: _roll.description,
          value: _roll.value,
        });
      });
      const saveResult = await this.store.save(dbRolls);
      return new StoreSaveResponse<string>({
        values: saveResult.map(result => result.id),
      });
    } catch (err) {
      this.logAndThrow(err);
    }
  }

  async update(rolls: Array<Roll>): Promise<StoreSaveResponse<string>> {
    try {
      const savedRolls = rolls
        .filter(async roll => {
          const rollToUpdate = await this.store.findOne({ id: roll.id });
          if (rollToUpdate) {
            rollToUpdate.name = roll.name;
            rollToUpdate.description = roll.description;
            this.store.save(rollToUpdate);
            return true;
          }
        });
      const savedIds = savedRolls.map(savedRoll => {
        return savedRoll.id;
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
      const deletedRollIds = ids
        .filter(async id => {
          const rollToDelete = await this.store.findOne({ id });
          if (rollToDelete) {
            this.store.remove(rollToDelete);
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
    l('RollStore: ' + err);
    throw err;
  }
}

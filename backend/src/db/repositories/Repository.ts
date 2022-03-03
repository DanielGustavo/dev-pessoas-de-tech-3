import { isUUID } from 'class-validator';
import {
  FindManyOptions,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository as TypeORMRepository,
} from 'typeorm';

import { Filter } from '../../shared/types';

interface FindManyParams<T> extends FindManyOptions<T> {
  filter?: Filter;
  page?: number;
}

export abstract class Repository<T> extends TypeORMRepository<T> {
  findMany({ filter, page = 1, take = 15, ...options }: FindManyParams<T>) {
    const where = this.createWhereObjectFromFilter(filter);

    const skip = take * (page - 1);

    return this.find({ ...options, where, skip, take });
  }

  protected createWhereObjectFromFilter(filter: Filter) {
    const where = {};

    const operatorMethod = {
      '=': (value: string | number | unknown) =>
        typeof value === 'string' && !isUUID(value)
          ? Like(`%${value}%`)
          : value,
      '>': MoreThan,
      '>=': MoreThanOrEqual,
      '<': LessThan,
      '<=': LessThanOrEqual,
      '!=': Not,
    };

    Object.entries(filter).forEach(([column, { value, operator }]) => {
      const method = operatorMethod[operator];

      where[column] = method(value);
    });

    return where;
  }
}

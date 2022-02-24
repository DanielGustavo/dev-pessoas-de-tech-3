import {
  EntityRepository,
  FindManyOptions,
  Repository,
  Like,
  Not,
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
} from 'typeorm';

import { Employee } from '../entities';

interface Filter {
  [key: string]: {
    operator: '=' | '>' | '>=' | '<' | '<=' | '!=';
    value: string | number;
  };
}

interface FindManyParams extends FindManyOptions<Employee> {
  filter?: Filter;
  page?: number;
}

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }

  findByPhone(phone: string) {
    return this.findOne({ phone });
  }

  findMany({ filter, page = 1, take = 15, ...options }: FindManyParams) {
    const where = this.createWhereObjectFromFilter(filter);

    const skip = take * (page - 1);

    return this.find({ ...options, where, skip, take });
  }

  private createWhereObjectFromFilter(filter: Filter) {
    const where = {};

    const operatorMethod = {
      '=': (value: string | number | unknown) =>
        typeof value === 'string' ? Like(`%${value}%`) : value,
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

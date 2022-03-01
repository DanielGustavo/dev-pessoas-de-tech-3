import { OrderByCondition } from 'typeorm';

import { employeeRepository } from '../db/repositories';

import { Filter, Order, Pagination } from '../shared/types';

interface Request {
  order?: Order;
  filter?: Filter;
  pagination?: Pagination;
}

export class LoadEmployeesService {
  async execute(request?: Request) {
    const order = (request?.order ?? { name: 'ASC' }) as OrderByCondition;
    const filter = (request?.filter ?? {}) as Filter;

    const employees = await employeeRepository.findMany({
      order,
      filter,
      ...request?.pagination,
    });

    return employees;
  }
}

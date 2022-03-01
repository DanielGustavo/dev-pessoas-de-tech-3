import { OrderByCondition } from 'typeorm';

import { customerRepository } from '../db/repositories';

import { Filter, Order, Pagination } from '../shared/types';

interface Request {
  order?: Order;
  filter?: Filter;
  pagination?: Pagination;
}

export class LoadCustomersService {
  async execute(request?: Request) {
    const order = (request?.order ?? { name: 'ASC' }) as OrderByCondition;
    const filter = (request?.filter ?? {}) as Filter;

    const customers = await customerRepository.findMany({
      order,
      filter,
      ...request?.pagination,
    });

    return customers;
  }
}

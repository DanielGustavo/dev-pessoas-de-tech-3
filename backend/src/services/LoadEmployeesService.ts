import { OrderByCondition } from 'typeorm';

import { employeeRepository } from '../db/repositories';

export interface Order {
  [key: string]: string;
}

export interface Filter {
  [key: string]: {
    operator: '=' | '>' | '>=' | '<' | '<=' | '!=';
    value: string | number;
  };
}

interface Request {
  order?: Order;
  filter?: Filter;
  pagination?: {
    page: number;
    take: number;
  };
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

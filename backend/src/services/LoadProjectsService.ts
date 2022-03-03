import { OrderByCondition } from 'typeorm';

import { projectRepository } from '../db/repositories';

import { Filter, Order, Pagination } from '../shared/types';

interface Request {
  order?: Order;
  filter?: Filter;
  pagination?: Pagination;
}

export class LoadProjectsService {
  async execute(request?: Request) {
    const order = (request?.order ?? { deadline: 'ASC' }) as OrderByCondition;
    const filter = (request?.filter ?? {}) as Filter;

    const projects = await projectRepository.findMany({
      order,
      filter,
      ...request?.pagination,
    });

    return projects;
  }
}

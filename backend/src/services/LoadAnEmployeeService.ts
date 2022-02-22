import { ApolloError } from 'apollo-server-express';

import { employeeRepository } from '../db/repositories';

interface Request {
  employeeId: string;
}

export class LoadAnEmployeeService {
  async execute({ employeeId }: Request) {
    const employee = await employeeRepository.findOne(employeeId);

    if (!employee) {
      throw new ApolloError('This employee does not exist', '404');
    }

    return employee;
  }
}

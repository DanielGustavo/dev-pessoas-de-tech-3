import { ApolloError } from 'apollo-server-express';

import { employeeRepository } from '../db/repositories';

import { StorageHelper } from './dependencies/StorageHelper';

interface Request {
  employeeId: string;
}

export class DeleteEmployeeService {
  constructor(storageHelper: StorageHelper) {
    this.storageHelper = storageHelper;
  }

  private storageHelper: StorageHelper;

  async execute({ employeeId }: Request) {
    const employee = await employeeRepository.findOne(employeeId);

    if (!employee) {
      throw new ApolloError('This employee does not exist', '404');
    }

    await employeeRepository.delete(employeeId);

    if (employee.avatarFilename) {
      try {
        await this.storageHelper.delete({ filename: employee.avatarFilename });
      } catch {
        throw new ApolloError(
          'Something went wrong with the storage system',
          '500'
        );
      }
    }

    return employee;
  }
}

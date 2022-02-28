import { ApolloError } from 'apollo-server-express';

import { LocalUploader } from '../helpers/LocalUploader';

import { employeeRepository } from '../db/repositories';

interface Request {
  employeeId: string;
}

export class DeleteEmployeeService {
  async execute({ employeeId }: Request) {
    const employee = await employeeRepository.findOne(employeeId);

    if (!employee) {
      throw new ApolloError('This employee does not exist', '404');
    }

    await employeeRepository.delete(employeeId);

    if (employee.avatarFilename) {
      const uploader = new LocalUploader();
      await uploader.delete({ filename: employee.avatarFilename });
    }

    return employee;
  }
}

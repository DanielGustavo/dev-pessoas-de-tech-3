import {
  ApolloError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-express';

import { EmployeeRoles } from '../db/entities';
import { employeeRepository } from '../db/repositories';

import { getNonUndefinedFieldsFromObject } from '../utils/getNonUndefinedFieldsFromObject';

interface Request {
  fields: {
    name?: string;
    email?: string;
    phone?: string;
    salary?: number;
    role?: keyof typeof EmployeeRoles;
  };
  employeeId: string;
}

export class EditEmployeeService {
  async execute({ fields, employeeId }: Request) {
    const { role, email, salary, phone } = fields;

    if (salary < 0) {
      throw new ForbiddenError('The salary can not be a negative number');
    }

    const emailAlreadyExists = email
      ? !!(await employeeRepository.findByEmail(email))
      : false;

    if (emailAlreadyExists) {
      throw new ForbiddenError('This email is already in use');
    }

    const phoneAlreadyExists = phone
      ? !!(await employeeRepository.findByPhone(phone))
      : false;

    if (phoneAlreadyExists) {
      throw new ForbiddenError('This phone number is already in use');
    }

    const roleDoesNotExist = role
      ? !Object.keys(EmployeeRoles).includes(role)
      : false;

    if (roleDoesNotExist) {
      throw new UserInputError(`Role "${role}" does not exist`);
    }

    const changedFields = getNonUndefinedFieldsFromObject(fields);

    const employee = await employeeRepository.findOne(employeeId);

    if (!employee) {
      throw new ApolloError('This employee does not exist', '404');
    }

    Object.assign(employee, changedFields);
    await employeeRepository.save(employee);

    return employee;
  }
}

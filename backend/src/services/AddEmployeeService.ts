import { ForbiddenError, UserInputError } from 'apollo-server-express';

import { EmployeeRoles } from '../db/entities';
import { employeeRepository } from '../db/repositories';

interface Request {
  name: string;
  email: string;
  phone?: string;
  salary: number;
  role: keyof typeof EmployeeRoles;
}

export class AddEmployeeService {
  async execute({ name, role, email, salary, phone }: Request) {
    if (salary < 0) {
      throw new ForbiddenError('The salary can not be a negative number');
    }

    const emailAlreadyExists = !!(await employeeRepository.findByEmail(email));
    if (emailAlreadyExists) {
      throw new ForbiddenError('This email is already in use');
    }

    const phoneAlreadyExists = !!(await employeeRepository.findByPhone(phone));
    if (phoneAlreadyExists) {
      throw new ForbiddenError('This phone number is already in use');
    }

    const roleDoesNotExist = !Object.keys(EmployeeRoles).includes(role);
    if (roleDoesNotExist) {
      throw new UserInputError(`Role "${role}" does not exist`);
    }

    const employee = employeeRepository.create({
      name,
      email,
      phone,
      salary,
      role,
    });

    return employeeRepository.save(employee);
  }
}

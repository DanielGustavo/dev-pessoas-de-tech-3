import { getCustomRepository } from 'typeorm';

import { UserRepository } from './UserRepository';
import { EmployeeRepository } from './EmployeeRepository';
import { CustomerRepository } from './CustomerRepository';

export const userRepository = getCustomRepository(UserRepository);
export const employeeRepository = getCustomRepository(EmployeeRepository);
export const customerRepository = getCustomRepository(CustomerRepository);

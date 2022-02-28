import { getCustomRepository } from 'typeorm';

import { UserRepository } from './UserRepository';
import { EmployeeRepository } from './EmployeeRepository';

export const userRepository = getCustomRepository(UserRepository);
export const employeeRepository = getCustomRepository(EmployeeRepository);

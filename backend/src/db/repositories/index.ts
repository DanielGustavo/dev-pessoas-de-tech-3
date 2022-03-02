import { getCustomRepository } from 'typeorm';

import { UserRepository } from './UserRepository';
import { EmployeeRepository } from './EmployeeRepository';
import { CustomerRepository } from './CustomerRepository';
import { ProjectRepository } from './ProjectRepository';

export const userRepository = getCustomRepository(UserRepository);
export const employeeRepository = getCustomRepository(EmployeeRepository);
export const customerRepository = getCustomRepository(CustomerRepository);
export const projectRepository = getCustomRepository(ProjectRepository);

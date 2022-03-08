import { employeeRepository } from '../db/repositories';

export class LoadEmployeesQuantityService {
  execute() {
    return employeeRepository.count();
  }
}

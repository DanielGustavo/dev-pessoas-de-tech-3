import { EntityRepository } from 'typeorm';

import { Repository } from './Repository';

import { Employee } from '../entities';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }

  findByPhone(phone: string) {
    return this.findOne({ phone });
  }
}

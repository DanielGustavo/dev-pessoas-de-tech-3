import { EntityRepository, Repository } from 'typeorm';

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

import { EntityRepository } from 'typeorm';

import { Repository } from './Repository';

import { Customer } from '../entities';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }

  findByPhone(phone: string) {
    return this.findOne({ phone });
  }

  findByCnpj(cnpj: string) {
    return this.findOne({ cnpj });
  }
}

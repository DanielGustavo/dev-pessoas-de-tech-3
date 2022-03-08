import { customerRepository } from '../db/repositories';

export class LoadCustomersQuantityService {
  execute() {
    return customerRepository.count();
  }
}

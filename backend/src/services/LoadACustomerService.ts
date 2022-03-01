import { ApolloError } from 'apollo-server-express';

import { customerRepository } from '../db/repositories';

interface Request {
  customerId: string;
}

export class LoadACustomerService {
  async execute({ customerId }: Request) {
    const customer = await customerRepository.findOne(customerId);

    if (!customer) {
      throw new ApolloError('This customer does not exist', '404');
    }

    return customer;
  }
}

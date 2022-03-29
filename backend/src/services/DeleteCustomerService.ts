import { ApolloError } from 'apollo-server-express';

import { LocalStorage } from '../helpers/LocalStorage';

import { customerRepository } from '../db/repositories';

interface Request {
  customerId: string;
}

export class DeleteCustomerService {
  async execute({ customerId }: Request) {
    const customer = await customerRepository.findOne(customerId);

    if (!customer) {
      throw new ApolloError('This customer does not exist', '404');
    }

    await customerRepository.delete(customerId);

    if (customer.avatarFilename) {
      const storageHelper = new LocalStorage();
      await storageHelper.delete({ filename: customer.avatarFilename });
    }

    return customer;
  }
}

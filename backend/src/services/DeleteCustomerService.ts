import { ApolloError } from 'apollo-server-express';

import { customerRepository } from '../db/repositories';

import { StorageHelper } from './dependencies/StorageHelper';

interface Request {
  customerId: string;
}

export class DeleteCustomerService {
  constructor(storageHelper: StorageHelper) {
    this.storageHelper = storageHelper;
  }

  private storageHelper: StorageHelper;

  async execute({ customerId }: Request) {
    const customer = await customerRepository.findOne(customerId);

    if (!customer) {
      throw new ApolloError('This customer does not exist', '404');
    }

    await customerRepository.delete(customerId);

    if (customer.avatarFilename) {
      try {
        await this.storageHelper.delete({ filename: customer.avatarFilename });
      } catch {
        throw new ApolloError(
          'Something went wrong with the storage system',
          '500'
        );
      }
    }

    return customer;
  }
}

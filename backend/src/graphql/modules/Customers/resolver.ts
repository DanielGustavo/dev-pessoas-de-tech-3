import { Args, Authorized, Mutation, Resolver } from 'type-graphql';

import { AddCustomerService } from '../../../services/AddCustomerService';

import { AddCustomerArgs, Customer } from './schema';

@Resolver()
export class CustomersResolver {
  @Authorized()
  @Mutation(() => Customer)
  async addCustomer(
    @Args() { name, email, cnpj, phone, site }: AddCustomerArgs
  ) {
    const addCustomerService = new AddCustomerService();
    const customer = await addCustomerService.execute({
      name,
      email,
      cnpj,
      phone,
      site,
    });

    return customer;
  }
}

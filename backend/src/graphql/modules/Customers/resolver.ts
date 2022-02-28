import { Args, Authorized, Mutation, Resolver } from 'type-graphql';

import { AddCustomerService } from '../../../services/AddCustomerService';
import { DeleteCustomerService } from '../../../services/DeleteCustomerService';

import { AddCustomerArgs, Customer, CustomerId } from './schema';

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

  @Authorized()
  @Mutation(() => Customer)
  async deleteCustomer(@Args() { customerId }: CustomerId) {
    const deleteCustomerService = new DeleteCustomerService();
    const customer = await deleteCustomerService.execute({ customerId });

    return customer;
  }
}

import { FileUpload, GraphQLUpload } from 'graphql-upload';
import {
  Arg,
  Args,
  Authorized,
  Int,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';

import { storageHelperFactory } from '../../../factories/storageHelperFactory';

import { AddCustomerProfilePictureService } from '../../../services/AddCustomerProfilePictureService';
import { AddCustomerService } from '../../../services/AddCustomerService';
import { DeleteCustomerService } from '../../../services/DeleteCustomerService';
import { EditCustomerService } from '../../../services/EditCustomerService';
import { LoadACustomerService } from '../../../services/LoadACustomerService';
import { LoadCustomersQuantityService } from '../../../services/LoadCustomersQuantityService';
import { LoadCustomersService } from '../../../services/LoadCustomersService';

import { PaginationArgs } from '../../../shared/graphql/schema';
import { Filter, Order } from '../../../shared/types';

import {
  AddCustomerArgs,
  Customer,
  CustomerId,
  EditCustomerArgs,
  LoadCustomersFilterArgs,
  LoadCustomersOrderArgs,
} from './schema';

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
    const storageHelper = storageHelperFactory();

    const deleteCustomerService = new DeleteCustomerService(storageHelper);
    const customer = await deleteCustomerService.execute({ customerId });

    return customer;
  }

  @Authorized()
  @Mutation(() => Customer)
  async editCustomer(
    @Args() { name, cnpj, email, phone, site, customerId }: EditCustomerArgs
  ) {
    const editCustomerService = new EditCustomerService();
    const customer = await editCustomerService.execute({
      fields: {
        name,
        cnpj,
        email,
        phone,
        site,
      },
      customerId,
    });

    return customer;
  }

  @Authorized()
  @Mutation(() => Customer)
  async addCustomerProfilePicture(
    @Arg('picture', () => GraphQLUpload) picture: FileUpload,
    @Args() { customerId }: CustomerId
  ) {
    const storageHelper = storageHelperFactory();

    const addCustomerProfilePictureService =
      new AddCustomerProfilePictureService(storageHelper);

    const customer = await addCustomerProfilePictureService.execute({
      imageStream: picture.createReadStream(),
      fileType: picture.mimetype,
      customerId,
    });

    return customer;
  }

  @Authorized()
  @Query(() => Int)
  async customersQuantity() {
    const loadCustomersQuantityService = new LoadCustomersQuantityService();
    const customersQuantity = await loadCustomersQuantityService.execute();

    return customersQuantity;
  }

  @Authorized()
  @Query(() => Customer)
  async loadACustomer(@Args() { customerId }: CustomerId) {
    const loadACustomerService = new LoadACustomerService();
    const customer = await loadACustomerService.execute({ customerId });

    return customer;
  }

  @Authorized()
  @Query(() => [Customer])
  async loadCustomers(
    @Arg('order', () => LoadCustomersOrderArgs, { nullable: true })
    order: Order,

    @Arg('filter', () => LoadCustomersFilterArgs, { nullable: true })
    filter: Filter,

    @Arg('pagination', () => PaginationArgs, { nullable: true })
    pagination: PaginationArgs
  ) {
    const loadCustomersService = new LoadCustomersService();

    const customers = await loadCustomersService.execute({
      order,
      filter,
      pagination,
    });

    return customers;
  }
}

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
import { UserInputError } from 'apollo-server-express';
import { isUUID } from 'class-validator';

import { AddEmployeeService } from '../../../services/AddEmployeeService';
import { AddEmployeeProfilePictureService } from '../../../services/AddEmployeeProfilePictureService';
import { DeleteEmployeeService } from '../../../services/DeleteEmployeeService';
import { EditEmployeeService } from '../../../services/EditEmployeeService';
import { LoadAnEmployeeService } from '../../../services/LoadAnEmployeeService';
import { LoadEmployeesService } from '../../../services/LoadEmployeesService';
import { LoadEmployeesQuantityService } from '../../../services/LoadEmployeesQuantityService';

import {
  AddEmployeeArgs,
  EditEmployeeArgs,
  Employee,
  EmployeeId,
  LoadEmployeesFilterArgs,
  LoadEmployeesOrderArgs,
} from './schema';

import { Filter, Order } from '../../../shared/types';
import { PaginationArgs } from '../../../shared/graphql/schema';

import { storageHelperFactory } from '../../../factories/storageHelperFactory';

@Resolver()
class EmployeesResolver {
  @Authorized()
  @Mutation(() => Employee)
  async addEmployee(
    @Args() { email, name, phone, role, salary }: AddEmployeeArgs
  ) {
    const addEmployeeService = new AddEmployeeService();
    const employee = await addEmployeeService.execute({
      email,
      name,
      phone,
      role,
      salary,
    });

    return employee;
  }

  @Authorized()
  @Mutation(() => Employee)
  async addEmployeeProfilePicture(
    @Arg('picture', () => GraphQLUpload) picture: FileUpload,
    @Args() { employeeId }: EmployeeId
  ) {
    if (!isUUID(employeeId)) {
      throw new UserInputError('employeeId must be a valid UUID');
    }

    const storageHelper = storageHelperFactory();

    const addEmployeeProfilePictureService =
      new AddEmployeeProfilePictureService(storageHelper);

    const employee = await addEmployeeProfilePictureService.execute({
      imageStream: picture.createReadStream(),
      fileType: picture.mimetype,
      employeeId,
    });

    return employee;
  }

  @Authorized()
  @Mutation(() => Employee)
  async deleteEmployee(@Args() { employeeId }: EmployeeId) {
    const storageHelper = storageHelperFactory();

    const deleteEmployeeService = new DeleteEmployeeService(storageHelper);

    const employee = await deleteEmployeeService.execute({ employeeId });

    return employee;
  }

  @Authorized()
  @Query(() => Int)
  async employeesQuantity() {
    const loadEmployeesQuantityService = new LoadEmployeesQuantityService();
    const employeesQuantity = await loadEmployeesQuantityService.execute();

    return employeesQuantity;
  }

  @Authorized()
  @Query(() => Employee)
  async loadEmployee(@Args() { employeeId }: EmployeeId) {
    const loadAnEmployeeService = new LoadAnEmployeeService();

    const employee = await loadAnEmployeeService.execute({ employeeId });

    return employee;
  }

  @Authorized()
  @Query(() => [Employee])
  async loadEmployees(
    @Arg('order', () => LoadEmployeesOrderArgs, { nullable: true })
    order: Order,

    @Arg('filter', () => LoadEmployeesFilterArgs, { nullable: true })
    filter: Filter,

    @Arg('pagination', () => PaginationArgs, { nullable: true })
    pagination: PaginationArgs
  ) {
    const loadEmployeesService = new LoadEmployeesService();

    const employees = await loadEmployeesService.execute({
      order,
      filter,
      pagination,
    });

    return employees;
  }

  @Authorized()
  @Mutation(() => Employee)
  async editEmployee(
    @Args() { email, name, phone, role, salary, employeeId }: EditEmployeeArgs
  ) {
    const editEmployeeService = new EditEmployeeService();
    const employee = await editEmployeeService.execute({
      fields: {
        email,
        name,
        phone,
        role,
        salary,
      },
      employeeId,
    });

    return employee;
  }
}

export { EmployeesResolver };

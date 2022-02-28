import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Arg, Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { UserInputError } from 'apollo-server-express';
import { isUUID } from 'class-validator';

import { AddEmployeeService } from '../../../services/AddEmployeeService';
import { AddEmployeeProfilePictureService } from '../../../services/AddEmployeeProfilePictureService';
import { DeleteEmployeeService } from '../../../services/DeleteEmployeeService';
import { EditEmployeeService } from '../../../services/EditEmployeeService';
import { LoadAnEmployeeService } from '../../../services/LoadAnEmployeeService';
import {
  Filter,
  LoadEmployeesService,
  Order,
} from '../../../services/LoadEmployeesService';

import {
  AddEmployeeArgs,
  EditEmployeeArgs,
  Employee,
  EmployeeId,
  LoadEmployeesFilterArgs,
  LoadEmployeesOrderArgs,
  PaginationArgs,
} from './schema';

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

    const addEmployeeProfilePictureService =
      new AddEmployeeProfilePictureService();

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
    const deleteEmployeeService = new DeleteEmployeeService();

    const employee = await deleteEmployeeService.execute({ employeeId });

    return employee;
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

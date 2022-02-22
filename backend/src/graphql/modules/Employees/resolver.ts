import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Arg, Args, Authorized, ID, Mutation, Resolver } from 'type-graphql';
import { UserInputError } from 'apollo-server-express';
import { isUUID } from 'class-validator';

import { AddEmployeeService } from '../../../services/AddEmployeeService';
import { AddEmployeeProfilePictureService } from '../../../services/AddEmployeeProfilePictureService';
import { DeleteEmployeeService } from '../../../services/DeleteEmployeeService';
import { EditEmployeeService } from '../../../services/EditEmployeeService';

import { AddEmployeeArgs, EditEmployeeArgs, Employee } from './schema';

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
    @Arg('employeeId', () => ID)
    employeeId: string
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
  async deleteEmployee(@Arg('employeeId', () => ID) employeeId: string) {
    if (!isUUID(employeeId)) {
      throw new UserInputError('employeeId must be a valid UUID');
    }

    const deleteEmployeeService = new DeleteEmployeeService();

    const employee = await deleteEmployeeService.execute({ employeeId });

    return employee;
  }

  @Authorized()
  @Mutation(() => Employee)
  async editEmployee(
    @Arg('employeeId', () => ID) employeeId: string,
    @Args() { email, name, phone, role, salary }: EditEmployeeArgs
  ) {
    if (!isUUID(employeeId)) {
      throw new UserInputError('employeeId must be a valid UUID');
    }

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

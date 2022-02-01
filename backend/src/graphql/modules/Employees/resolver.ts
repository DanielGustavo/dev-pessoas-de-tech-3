import { Args, Authorized, Mutation, Resolver } from 'type-graphql';

import { AddEmployeeService } from '../../../services/AddEmployeeService';

import { AddEmployeeArgs, Employee } from './schema';

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
}

export { EmployeesResolver };

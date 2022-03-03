import {
  Args,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { AddProjectService } from '../../../services/AddProjectService';
import { DeleteProjectService } from '../../../services/DeleteProjectService';
import { LoadACustomerService } from '../../../services/LoadACustomerService';
import { LoadAnEmployeeService } from '../../../services/LoadAnEmployeeService';
import { LoadAProjectService } from '../../../services/LoadAProjectService';

import { Customer } from '../Customers/schema';
import { Employee } from '../Employees/schema';
import { AddProjectArgs, Project, ProjectId } from './schema';

@Resolver(Project)
class ProjectsResolver {
  @Authorized()
  @Mutation(() => Project)
  async addProject(@Args() args: AddProjectArgs) {
    const addProjectService = new AddProjectService();
    const project = await addProjectService.execute(args);

    return project;
  }

  @Authorized()
  @Mutation(() => Project)
  async deleteProject(@Args() { projectId }: ProjectId) {
    const deleteProjectService = new DeleteProjectService();
    const project = await deleteProjectService.execute({ projectId });

    return project;
  }

  @Authorized()
  @Query(() => Project)
  async loadAProject(@Args() { projectId }: ProjectId) {
    const loadAProjectService = new LoadAProjectService();
    const project = await loadAProjectService.execute({ projectId });

    return project;
  }

  @Authorized()
  @FieldResolver(() => Employee)
  async leader(@Root() project: Project) {
    const loadAnEmployeeService = new LoadAnEmployeeService();

    const leader = await loadAnEmployeeService.execute({
      employeeId: project.leaderId,
    });

    return leader;
  }

  @Authorized()
  @FieldResolver(() => Customer)
  async customer(@Root() project: Project) {
    const loadACustomerService = new LoadACustomerService();

    const customer = await loadACustomerService.execute({
      customerId: project.customerId,
    });

    return customer;
  }
}

export { ProjectsResolver };

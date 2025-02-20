import {
  Arg,
  Args,
  Authorized,
  FieldResolver,
  Float,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { AddEmployeeInProjectService } from '../../../services/AddEmployeeInProjectService';

import { AddProjectService } from '../../../services/AddProjectService';
import { DeleteEmployeeFromProjectService } from '../../../services/DeleteEmployeeFromProjectService';
import { DeleteProjectService } from '../../../services/DeleteProjectService';
import { EditProjectService } from '../../../services/EditProjectService';
import { LoadACustomerService } from '../../../services/LoadACustomerService';
import { LoadAnEmployeeService } from '../../../services/LoadAnEmployeeService';
import { LoadAProjectService } from '../../../services/LoadAProjectService';
import { LoadATeamFromAProject } from '../../../services/LoadATeamFromAProject';
import { LoadProjectsQuantityService } from '../../../services/LoadProjectsQuantityService';
import { LoadProjectsService } from '../../../services/LoadProjectsService';
import { ReplaceCustomerInAProjectService } from '../../../services/ReplaceCustomerInAProjectService';
import { ReplaceEmployeeInAProjectService } from '../../../services/ReplaceEmployeeInAProjectService';

import { PaginationArgs } from '../../../shared/graphql/schema';
import { Filter, Order } from '../../../shared/types';

import { Customer } from '../Customers/schema';
import { Employee } from '../Employees/schema';
import {
  AddEmployeeInAProjectArgs,
  AddProjectArgs,
  DeleteEmployeeFromProjectArgs,
  EditProjectArgs,
  LoadProjectsFilterArgs,
  LoadProjectsOrderArgs,
  Project,
  ProjectId,
  ReplaceCustomerInProjectArgs,
  ReplaceEmployeeInProjectArgs,
} from './schema';

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
  async editProject(@Args() args: EditProjectArgs) {
    const editProjectService = new EditProjectService();
    const project = await editProjectService.execute(args);

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
  @Mutation(() => Project)
  async addEmployeeInAProject(
    @Args() { projectId, employeeId }: AddEmployeeInAProjectArgs
  ) {
    const addEmployeeInProjectService = new AddEmployeeInProjectService();
    const project = await addEmployeeInProjectService.execute({
      projectId,
      employeeId,
    });

    return project;
  }

  @Authorized()
  @Mutation(() => Project)
  async deleteEmployeeFromProject(
    @Args() { projectId, employeeId }: DeleteEmployeeFromProjectArgs
  ) {
    const deleteEmployeeFromProjectService =
      new DeleteEmployeeFromProjectService();

    const project = await deleteEmployeeFromProjectService.execute({
      projectId,
      employeeId,
    });

    return project;
  }

  @Authorized()
  @Mutation(() => Project)
  async replaceCustomerInProject(
    @Args() { projectId, customerId }: ReplaceCustomerInProjectArgs
  ) {
    const replaceCustomerInAProjectService =
      new ReplaceCustomerInAProjectService();

    const project = await replaceCustomerInAProjectService.execute({
      projectId,
      customerId,
    });

    return project;
  }

  @Authorized()
  @Mutation(() => Project)
  async replaceEmployeeInProject(
    @Args()
    {
      projectId,
      replacerEmployeeId,
      replacedEmployeeId,
    }: ReplaceEmployeeInProjectArgs
  ) {
    const replaceEmployeeInAProjectService =
      new ReplaceEmployeeInAProjectService();

    const project = await replaceEmployeeInAProjectService.execute({
      projectId,
      replacedEmployeeId,
      replacerEmployeeId,
    });

    return project;
  }

  @Authorized()
  @Query(() => Int)
  async projectsQuantity() {
    const loadProjectsQuantityService = new LoadProjectsQuantityService();
    const projectsQuantity = await loadProjectsQuantityService.execute();

    return projectsQuantity;
  }

  @Authorized()
  @Query(() => Project)
  async loadAProject(@Args() { projectId }: ProjectId) {
    const loadAProjectService = new LoadAProjectService();
    const project = await loadAProjectService.execute({ projectId });

    return project;
  }

  @Authorized()
  @Query(() => [Project])
  async loadProjects(
    @Arg('filter', () => LoadProjectsFilterArgs, { nullable: true })
    filter: Filter,

    @Arg('order', () => LoadProjectsOrderArgs, { nullable: true })
    order: Order,

    @Arg('pagination', () => PaginationArgs, { nullable: true })
    pagination: PaginationArgs
  ) {
    const loadProjectsService = new LoadProjectsService();
    const projects = await loadProjectsService.execute({
      filter,
      order,
      pagination,
    });

    return projects;
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

  @Authorized()
  @FieldResolver(() => [Employee])
  async team(@Root() project: Project) {
    const loadATeamFromAProjectService = new LoadATeamFromAProject();

    if (project.team !== undefined) return project.team;

    const team = await loadATeamFromAProjectService.execute({
      projectId: project.id,
    });

    return team;
  }

  @Authorized()
  @FieldResolver(() => Float)
  value(@Root() project: Project) {
    const technicalHours = project.technicalSeconds / (60 * 60);
    const value = project.paymentPerHour * technicalHours;

    return value;
  }

  @Authorized()
  @FieldResolver(() => Float)
  technicalHours(@Root() project: Project) {
    const technicalHours = project.technicalSeconds / (60 * 60);

    return technicalHours;
  }
}

export { ProjectsResolver };

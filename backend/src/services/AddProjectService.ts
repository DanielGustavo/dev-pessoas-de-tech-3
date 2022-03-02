import { ApolloError, ForbiddenError } from 'apollo-server-express';

import {
  customerRepository,
  employeeRepository,
  projectRepository,
} from '../db/repositories';

interface Request {
  name: string;
  description?: string;
  deadline: number;
  priority?: string;
  technicalHours: number;
  paymentPerHour: number;
  discount?: number;
  leaderId: string;
  customerId: string;
  developerId: string;
  designerId: string;
}

export class AddProjectService {
  async execute({
    customerId,
    deadline,
    designerId,
    developerId,
    leaderId,
    name,
    paymentPerHour,
    technicalHours,
    description,
    discount,
    priority = 'low',
  }: Request) {
    const oneMinute = 1 * 60 * 1000;
    const deadlineIsNotAFutureDate =
      new Date().getTime() + oneMinute > deadline;

    if (deadlineIsNotAFutureDate) {
      throw new ForbiddenError(
        'Deadline must be at least 1 minute later than now'
      );
    }

    const technicalSeconds = technicalHours * 60 * 60;

    const customerDoesNotExist = !(await customerRepository.findOne(
      customerId
    ));

    if (customerDoesNotExist) {
      throw new ApolloError('This customer does not exist', '404');
    }

    const leader = await employeeRepository.findOne(leaderId);

    if (!leader) {
      throw new ApolloError('This leader does not exist', '404');
    }

    const developerIsTheLeader = developerId === leaderId;
    const designerIsTheLeader = designerId === leaderId;

    let developer;

    if (developerIsTheLeader) {
      developer = leader;
    } else {
      developer = await employeeRepository.findOne(developerId);
    }

    if (!developer) {
      throw new ApolloError('This developer does not exist', '404');
    }

    const developerIsNotFrontendOrBackend =
      ['frontend', 'backend'].includes(developer.role) === false;

    if (developerIsNotFrontendOrBackend) {
      throw new ForbiddenError(
        `"${developer.name}" has the role: "${developer.role}". This employee is not a developer`
      );
    }

    let designer;

    if (designerIsTheLeader) {
      designer = leader;
    } else {
      designer = await employeeRepository.findOne(designerId);
    }

    if (!designer) {
      throw new ApolloError('This designer does not exist', '404');
    }

    if (designer.role !== 'designer') {
      throw new ForbiddenError(
        `"${designer.name}" has the role: "${designer.role}". This employee is not a designer`
      );
    }

    const project = projectRepository.create({
      customerId,
      deadline: new Date(deadline),
      leaderId,
      name,
      paymentPerHour,
      technicalSeconds,
      description,
      discount,
      priorityLevel: priority,
    });

    await projectRepository.save(project);

    const leaderIsTheDeveloperOrDesigner = [developerId, designerId].includes(
      leaderId
    );

    const employeesIds = [developerId, designerId];

    if (leaderIsTheDeveloperOrDesigner === false) {
      employeesIds.push(leaderId);
    }

    await projectRepository.addEmployeesInTeam({
      employeesIds,
      projectId: project.id,
    });

    return project;
  }
}

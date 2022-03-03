import { ApolloError, ForbiddenError } from 'apollo-server-express';

import { customerRepository, projectRepository } from '../db/repositories';

interface Request {
  projectId: string;
  customerId: string;
}

export class ReplaceCustomerInAProjectService {
  async execute({ projectId, customerId }: Request) {
    const project = await projectRepository.findOne(projectId);

    if (!project) {
      throw new ApolloError('This project does not exist', '404');
    }

    const customerIsAlreadyInTheProject = project.customerId === customerId;

    if (customerIsAlreadyInTheProject) {
      throw new ForbiddenError('This customer is already in this project');
    }

    const customer = await customerRepository.findOne(customerId);

    if (!customer) {
      throw new ApolloError('This customer does not exist', '404');
    }

    project.customerId = customerId;

    await projectRepository.save(project);

    return project;
  }
}

import { ApolloError } from 'apollo-server-express';

import { projectRepository } from '../db/repositories';

interface Request {
  projectId: string;
}

export class DeleteProjectService {
  async execute({ projectId }: Request) {
    const project = await projectRepository.findOne(projectId);

    if (!project) {
      throw new ApolloError('This project does not exist', '404');
    }

    await projectRepository.delete(projectId);

    return project;
  }
}

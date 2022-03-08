import { ApolloError } from 'apollo-server-express';

import { projectRepository } from '../db/repositories';

interface Request {
  projectId: string;
}

export class LoadAProjectService {
  async execute({ projectId }: Request) {
    const project = await projectRepository.findOne(projectId);

    if (!project) {
      throw new ApolloError('This project does not exist', '404');
    }

    return project;
  }
}

import { ApolloError } from 'apollo-server-express';

import { projectRepository } from '../db/repositories';

interface Request {
  projectId: string;
}

export class LoadATeamFromAProject {
  async execute({ projectId }: Request) {
    const project = await projectRepository.findOne(projectId, {
      relations: ['team'],
    });

    if (!project) {
      throw new ApolloError('This project does not exist', '404');
    }

    return project.team;
  }
}

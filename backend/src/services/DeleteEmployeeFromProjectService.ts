import { ApolloError, ForbiddenError } from 'apollo-server-express';

import { projectRepository } from '../db/repositories';

interface Request {
  projectId: string;
  employeeId: string;
}

export class DeleteEmployeeFromProjectService {
  async execute({ projectId, employeeId }: Request) {
    const project = await projectRepository.findOne(projectId, {
      relations: ['team'],
    });

    if (!project) {
      throw new ApolloError('This project does not exist', '404');
    }

    const employeeIsTheLeader = employeeId === project.leaderId;

    if (employeeIsTheLeader) {
      throw new ForbiddenError(
        'You can not delete the leader from a project, only replace it'
      );
    }

    const employeeIsInTheProject =
      project.team.findIndex(({ id }) => id === employeeId) > -1;

    if (!employeeIsInTheProject) {
      throw new ForbiddenError("This employee isn't in this project");
    }

    await projectRepository.deleteEmployeeFromProject({
      employeeId,
      projectId,
    });

    const updatedTeam = project.team.filter(({ id }) => id !== employeeId);

    Object.assign(project, { team: updatedTeam });

    return project;
  }
}

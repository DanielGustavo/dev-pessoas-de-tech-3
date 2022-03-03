import { ApolloError, ForbiddenError } from 'apollo-server-express';
import { employeeRepository, projectRepository } from '../db/repositories';

interface Request {
  employeeId: string;
  projectId: string;
}

export class AddEmployeeInProjectService {
  async execute({ employeeId, projectId }: Request) {
    const employee = await employeeRepository.findOne(employeeId);

    if (!employee) {
      throw new ApolloError('This employee does not exist', '404');
    }

    const project = await projectRepository.findOne(projectId, {
      relations: ['team'],
    });

    if (!project) {
      throw new ApolloError('This project does not exist', '404');
    }

    const employeeIsAlreadyInTheProject =
      project.team.findIndex(({ id }) => id === employeeId) > -1;

    if (employeeIsAlreadyInTheProject) {
      throw new ForbiddenError(
        'You can not add the same employee twice in a project'
      );
    }

    await projectRepository.addAnEmployeeInTeam({ employeeId, projectId });

    project.team.push(employee);

    return project;
  }
}

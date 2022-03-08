import { ApolloError, ForbiddenError } from 'apollo-server-express';

import { employeeRepository, projectRepository } from '../db/repositories';

interface Request {
  projectId: string;
  replacedEmployeeId: string;
  replacerEmployeeId: string;
}

export class ReplaceEmployeeInAProjectService {
  async execute({
    projectId,
    replacedEmployeeId,
    replacerEmployeeId,
  }: Request) {
    const project = await projectRepository.findOne(projectId, {
      relations: ['team'],
    });

    if (!project) {
      throw new ApolloError('This project does not exist', '404');
    }

    const theReplacedEmployeeIsInTheProject =
      project.team.findIndex(({ id }) => id === replacedEmployeeId) > -1;

    if (!theReplacedEmployeeIsInTheProject) {
      throw new ApolloError(
        "The employee to be replaced isn't in the project",
        '404'
      );
    }

    const theReplacerEmployeeIsTheLeader =
      project.leaderId === replacerEmployeeId;

    const theReplacedEmployeeIsTheLeader =
      project.leaderId === replacedEmployeeId;

    const theReplacerEmployeeIsInTheProject =
      project.team.findIndex(({ id }) => id === replacerEmployeeId) > -1;

    if (
      theReplacerEmployeeIsInTheProject &&
      !theReplacerEmployeeIsTheLeader &&
      !theReplacedEmployeeIsTheLeader
    ) {
      throw new ForbiddenError('This employee is already in this project');
    }

    const replacerEmployee = await employeeRepository.findOne(
      replacerEmployeeId
    );

    if (!replacerEmployee) {
      const replacedEmployee = await employeeRepository.findOne(
        replacedEmployeeId
      );

      throw new ApolloError(
        `The employee that should replace ${replacedEmployee.name} doesn't exist`,
        '404'
      );
    }

    if (
      !theReplacedEmployeeIsTheLeader ||
      (theReplacedEmployeeIsTheLeader && !theReplacerEmployeeIsInTheProject)
    ) {
      await projectRepository.deleteEmployeeFromProject({
        employeeId: replacedEmployeeId,
        projectId,
      });

      project.team = project.team.filter(({ id }) => id !== replacedEmployeeId);
    }

    if (theReplacedEmployeeIsTheLeader) {
      project.leaderId = replacerEmployeeId;
      await projectRepository.save(project);
    }

    if (!theReplacerEmployeeIsInTheProject) {
      await projectRepository.addAnEmployeeInTeam({
        employeeId: replacerEmployeeId,
        projectId,
      });

      project.team.push(replacerEmployee);
    }

    return project;
  }
}

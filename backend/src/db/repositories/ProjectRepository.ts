import { EntityRepository } from 'typeorm';

import { Repository } from './Repository';

import { Project } from '../entities';

interface AddEmployeesInTeamProps {
  employeesIds: string[];
  projectId: string;
}

interface AddAnEmployeeInTeamProps {
  employeeId: string;
  projectId: string;
}

interface DeleteEmployeeFromProject {
  employeeId: string;
  projectId: string;
}

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async addEmployeesInTeam({
    employeesIds,
    projectId,
  }: AddEmployeesInTeamProps) {
    const queryBuilder = this.createQueryBuilder();

    queryBuilder.relation('team').of(projectId).add(employeesIds);
  }

  async addAnEmployeeInTeam({
    employeeId,
    projectId,
  }: AddAnEmployeeInTeamProps) {
    const queryBuilder = this.createQueryBuilder();

    queryBuilder.relation('team').of(projectId).add(employeeId);
  }

  async deleteEmployeeFromProject({
    employeeId,
    projectId,
  }: DeleteEmployeeFromProject) {
    const queryBuilder = this.createQueryBuilder();

    queryBuilder.relation('team').of(projectId).remove(employeeId);
  }
}

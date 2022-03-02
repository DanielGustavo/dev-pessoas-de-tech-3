import { EntityRepository } from 'typeorm';

import { Repository } from './Repository';

import { Project } from '../entities';

interface AddEmployeesInTeamProps {
  employeesIds: string[];
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
}

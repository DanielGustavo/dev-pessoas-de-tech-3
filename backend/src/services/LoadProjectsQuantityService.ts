import { projectRepository } from '../db/repositories';

export class LoadProjectsQuantityService {
  execute() {
    return projectRepository.count();
  }
}

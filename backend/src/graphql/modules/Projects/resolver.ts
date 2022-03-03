import { Args, Authorized, Mutation, Resolver } from 'type-graphql';

import { AddProjectService } from '../../../services/AddProjectService';
import { DeleteProjectService } from '../../../services/DeleteProjectService';

import { AddProjectArgs, Project, ProjectId } from './schema';

@Resolver()
class ProjectsResolver {
  @Authorized()
  @Mutation(() => Project)
  async addProject(@Args() args: AddProjectArgs) {
    const addProjectService = new AddProjectService();
    const project = await addProjectService.execute(args);

    return project;
  }

  @Authorized()
  @Mutation(() => Project)
  async deleteProject(@Args() { projectId }: ProjectId) {
    const deleteProjectService = new DeleteProjectService();
    const project = await deleteProjectService.execute({ projectId });

    return project;
  }
}

export { ProjectsResolver };

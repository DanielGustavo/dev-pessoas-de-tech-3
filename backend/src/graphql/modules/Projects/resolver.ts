import { Args, Authorized, Mutation, Resolver } from 'type-graphql';

import { AddProjectService } from '../../../services/AddProjectService';

import { AddProjectArgs, Project } from './schema';

@Resolver()
class ProjectsResolver {
  @Authorized()
  @Mutation(() => Project)
  async addProject(@Args() args: AddProjectArgs) {
    const addProjectService = new AddProjectService();
    const project = await addProjectService.execute(args);

    return project;
  }
}

export { ProjectsResolver };

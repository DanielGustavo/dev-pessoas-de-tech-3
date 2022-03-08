import { ForbiddenError } from 'apollo-server-express';

import { projectRepository } from '../db/repositories';

interface Request {
  name?: string;
  description?: string;
  deadline?: number;
  priority?: string;
  technicalHours?: number;
  paymentPerHour?: number;
  discount?: number;
  projectId: string;
}

export class EditProjectService {
  async execute({
    deadline,
    name,
    paymentPerHour,
    technicalHours,
    description,
    discount,
    priority,
    projectId,
  }: Request) {
    const project = await projectRepository.findOne(projectId);

    if (deadline) {
      const oneMinute = 1 * 60 * 1000;
      const deadlineIsNotAFutureDate =
        new Date().getTime() + oneMinute > deadline;

      if (deadlineIsNotAFutureDate) {
        throw new ForbiddenError(
          'Deadline must be at least 1 minute later than now'
        );
      }

      project.deadline = new Date(deadline);
    }

    if (name) {
      project.name = name;
    }

    if (paymentPerHour) {
      project.paymentPerHour = paymentPerHour;
    }

    if (technicalHours) {
      const technicalSeconds = technicalHours * 60 * 60;

      project.technicalSeconds = technicalSeconds;
    }

    if (description) {
      project.description = description;
    }

    if (discount) {
      project.discount = discount;
    }

    if (priority) {
      project.priorityLevel = priority;
    }

    await projectRepository.save(project);

    return project;
  }
}

import { IsIn, IsUUID, Min } from 'class-validator';
import {
  ArgsType,
  Field,
  Float,
  ID,
  InputType,
  Int,
  ObjectType,
} from 'type-graphql';

import { ProjectPriorityLevel } from '../../../db/entities/Project';

import {
  FilterNumberField,
  FilterStringField,
} from '../../../shared/graphql/schema';

import { Employee } from '../Employees/schema';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  technicalSeconds: number;

  @Field(() => Float)
  paymentPerHour: number;

  @Field(() => Float, { nullable: true })
  discount?: number;

  @Field()
  deadline: Date;

  @Field()
  priorityLevel: string;

  @Field(() => [Employee], { nullable: true })
  team?: Employee[];

  @Field(() => ID, { nullable: true })
  customerId?: string;

  @Field(() => ID, { nullable: true })
  leaderId?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ArgsType()
export class EditProjectArgs {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  deadline?: number;

  @Field(() => String, { nullable: true })
  priority?: keyof typeof ProjectPriorityLevel;

  @Field(() => Float, { nullable: true })
  @Min(0)
  technicalHours?: number;

  @Field(() => Float, { nullable: true })
  @Min(0)
  paymentPerHour?: number;

  @Field(() => Float, { nullable: true })
  discount?: number;

  @Field(() => ID)
  @IsUUID()
  projectId: string;
}

@ArgsType()
export class AddProjectArgs {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  deadline: number;

  @Field(() => String, { nullable: true })
  priority?: keyof typeof ProjectPriorityLevel;

  @Field(() => Float)
  @Min(0)
  technicalHours: number;

  @Field(() => Float)
  @Min(0)
  paymentPerHour: number;

  @Field(() => Float, { nullable: true })
  discount?: number;

  @Field(() => ID)
  @IsUUID()
  leaderId: string;

  @Field(() => ID)
  @IsUUID()
  customerId: string;

  @Field(() => ID)
  @IsUUID()
  developerId: string;

  @Field(() => ID)
  @IsUUID()
  designerId: string;
}

@ArgsType()
export class ProjectId {
  @Field(() => ID)
  @IsUUID()
  projectId: string;
}

@InputType()
export class LoadProjectsOrderArgs {
  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  id: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  name: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  description: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  technicalSeconds: number;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  paymentPerHour: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  discount: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  deadline: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  priorityLevel: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  customerId: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  leaderId: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  createdAt: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  updatedAt: string;
}

@InputType()
export class LoadProjectsFilterArgs {
  @Field(() => FilterStringField, { nullable: true })
  name: FilterStringField;

  @Field(() => FilterStringField, { nullable: true })
  customerId: FilterStringField;

  @Field(() => FilterStringField, { nullable: true })
  leaderId: FilterStringField;

  @Field(() => FilterNumberField, { nullable: true })
  technicalSeconds: FilterNumberField;

  @Field(() => FilterNumberField, { nullable: true })
  paymentPerHour: FilterNumberField;

  @Field(() => FilterNumberField, { nullable: true })
  discount: FilterNumberField;

  @Field(() => FilterNumberField, { nullable: true })
  deadline: FilterNumberField;

  @Field(() => FilterStringField, { nullable: true })
  priorityLevel: FilterStringField;
}

@ArgsType()
export class AddEmployeeInAProjectArgs {
  @Field(() => ID)
  @IsUUID()
  employeeId: string;

  @Field(() => ID)
  @IsUUID()
  projectId: string;
}

@ArgsType()
export class DeleteEmployeeFromProjectArgs {
  @Field(() => ID)
  @IsUUID()
  employeeId: string;

  @Field(() => ID)
  @IsUUID()
  projectId: string;
}

@ArgsType()
export class ReplaceCustomerInProjectArgs {
  @Field(() => ID)
  @IsUUID()
  customerId: string;

  @Field(() => ID)
  @IsUUID()
  projectId: string;
}

@ArgsType()
export class ReplaceEmployeeInProjectArgs {
  @Field(() => ID)
  @IsUUID()
  replacedEmployeeId: string;

  @Field(() => ID)
  @IsUUID()
  replacerEmployeeId: string;

  @Field(() => ID)
  @IsUUID()
  projectId: string;
}

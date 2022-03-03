import { IsUUID, Min } from 'class-validator';
import { ArgsType, Field, Float, ID, Int, ObjectType } from 'type-graphql';

import { ProjectPriorityLevel } from '../../../db/entities/Project';

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
export class AddProjectArgs {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
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

import { IsEmail, IsMobilePhone, Min } from 'class-validator';
import { ArgsType, Field, Int, ID, ObjectType } from 'type-graphql';

import { EmployeeRoles } from '../../../db/entities';

@ArgsType()
export class AddEmployeeArgs {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsMobilePhone('any')
  phone?: string;

  @Field(() => Int)
  @Min(0)
  salary: number;

  @Field(() => String)
  role: keyof typeof EmployeeRoles;
}

@ObjectType()
export class Employee {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => Int)
  salary: number;

  @Field()
  role: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

import { IsEmail, IsMobilePhone, IsUUID, Min } from 'class-validator';
import { ArgsType, Field, Int, ID, ObjectType } from 'type-graphql';

import { EmployeeRoles } from '../../../db/entities';

@ArgsType()
export class EmployeeId {
  @Field(() => ID)
  @IsUUID()
  employeeId: string;
}

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

@ArgsType()
export class EditEmployeeArgs {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsMobilePhone('any')
  phone?: string;

  @Field(() => Int, { nullable: true })
  @Min(0)
  salary: number;

  @Field(() => String, { nullable: true })
  role: keyof typeof EmployeeRoles;

  @Field(() => ID)
  @IsUUID()
  employeeId: string;
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
  avatarFilename?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

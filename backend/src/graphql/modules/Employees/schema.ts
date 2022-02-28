import {
  IsEmail,
  IsMobilePhone,
  IsUUID,
  Min,
  IsIn,
  MinLength,
  MaxLength,
  Max,
} from 'class-validator';
import {
  ArgsType,
  Field,
  Int,
  ID,
  ObjectType,
  InputType,
  Float,
} from 'type-graphql';

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

  @Field(() => Float)
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

  @Field(() => Float, { nullable: true })
  @Min(0)
  salary: number;

  @Field(() => String, { nullable: true })
  role: keyof typeof EmployeeRoles;

  @Field(() => ID)
  @IsUUID()
  employeeId: string;
}

@InputType()
class FilterStringField {
  @Field()
  @MinLength(1)
  @MaxLength(255)
  value: string;

  @Field()
  @IsIn(['=', '!='])
  operator: string;
}

@InputType()
class FilterNumberField {
  @Field(() => Float)
  @MinLength(1)
  @MaxLength(255)
  value: number;

  @Field()
  @IsIn(['=', '>', '>=', '<', '<=', '!='])
  operator: string;
}

@InputType()
export class LoadEmployeesFilterArgs {
  @Field(() => FilterStringField, { nullable: true })
  name: FilterStringField;

  @Field(() => FilterStringField, { nullable: true })
  email: FilterStringField;

  @Field(() => FilterStringField, { nullable: true })
  phone: FilterStringField;

  @Field(() => FilterNumberField, { nullable: true })
  salary: FilterNumberField;

  @Field(() => FilterStringField, { nullable: true })
  role: FilterStringField;
}

@InputType()
export class PaginationArgs {
  @Field(() => Int)
  @Min(1)
  page: number;

  @Field(() => Int)
  @Min(1)
  @Max(30)
  take: number;
}

@InputType()
export class LoadEmployeesOrderArgs {
  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  id: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  avatarFilename: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  name: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  email: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  phone: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  salary: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  role: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  createdAt: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  updatedAt: string;
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

  @Field(() => Float)
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

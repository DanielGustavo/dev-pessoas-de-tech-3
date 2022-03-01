import {
  IsEmail,
  IsIn,
  IsMobilePhone,
  IsNumberString,
  IsUrl,
  IsUUID,
  Length,
} from 'class-validator';
import { ArgsType, Field, ID, InputType, ObjectType } from 'type-graphql';

import { FilterStringField } from '../../../shared/graphql/schema';

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  site?: string;

  @Field()
  cnpj: string;

  @Field({ nullable: true })
  avatarFilename?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ArgsType()
export class AddCustomerArgs {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsMobilePhone('any')
  phone?: string;

  @Field({ nullable: true })
  @IsUrl()
  site?: string;

  @Field()
  @Length(14)
  @IsNumberString()
  cnpj: string;
}

@ArgsType()
export class CustomerId {
  @Field(() => ID)
  @IsUUID()
  customerId: string;
}

@ArgsType()
export class EditCustomerArgs {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsMobilePhone('any')
  phone?: string;

  @Field({ nullable: true })
  @IsUrl()
  site?: string;

  @Field({ nullable: true })
  @Length(14)
  @IsNumberString()
  cnpj: string;

  @Field(() => ID)
  @IsUUID()
  customerId: string;
}

@InputType()
export class LoadCustomersOrderArgs {
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
  site: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  cnpj: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  createdAt: string;

  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'])
  updatedAt: string;
}

@InputType()
export class LoadCustomersFilterArgs {
  @Field(() => FilterStringField, { nullable: true })
  name: FilterStringField;

  @Field(() => FilterStringField, { nullable: true })
  email: FilterStringField;

  @Field(() => FilterStringField, { nullable: true })
  phone: FilterStringField;

  @Field(() => FilterStringField, { nullable: true })
  cnpj: FilterStringField;
}

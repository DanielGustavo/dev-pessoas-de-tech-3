import {
  IsEmail,
  IsMobilePhone,
  IsNumberString,
  IsUrl,
  IsUUID,
  Length,
} from 'class-validator';
import { ArgsType, Field, ID, ObjectType } from 'type-graphql';

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

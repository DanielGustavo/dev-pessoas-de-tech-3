import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { ArgsType, Field, ObjectType } from 'type-graphql';

@ArgsType()
export class LoginArgs {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(10)
  @MaxLength(120)
  password: string;
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class Login {
  @Field()
  user: User;

  @Field()
  token: string;
}

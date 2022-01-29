import { Authorized, Field, ObjectType } from 'type-graphql';

@ObjectType()
class HelloWorld {
  @Field()
  @Authorized()
  message: string;
}

export { HelloWorld };

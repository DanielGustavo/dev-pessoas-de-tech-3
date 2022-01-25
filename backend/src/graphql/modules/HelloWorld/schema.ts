import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class HelloWorld {
  @Field()
  message: string;
}

export { HelloWorld };

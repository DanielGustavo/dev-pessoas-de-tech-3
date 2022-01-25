import { Arg, Query, Resolver } from 'type-graphql';
import { HelloWorld } from './schema';

@Resolver(HelloWorld)
class HelloWorldResolver {
  @Query(() => HelloWorld)
  helloWorld(@Arg('name', { nullable: true }) name?: string) {
    return {
      message: `Hello ${name || 'world'}!`,
    };
  }
}

export { HelloWorldResolver };

import { Args, Mutation, Resolver } from 'type-graphql';

import { LoginService } from '../../../services/LoginService';

import { Login, LoginArgs } from './schema';

@Resolver()
class AuthenticationResolver {
  @Mutation(() => Login)
  async login(@Args() { email, password }: LoginArgs) {
    const loginService = new LoginService();
    const { user, token } = await loginService.execute({ email, password });

    return {
      user: { ...user },
      token,
    };
  }
}

export { AuthenticationResolver };

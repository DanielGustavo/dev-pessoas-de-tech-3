import bcrypt from 'bcrypt';
import { ApolloError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwtConfig';

import { userRepository } from '../db/repositories';

interface Request {
  email: string;
  password: string;
}

export class LoginService {
  async execute({ email, password }: Request) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new ApolloError('Email or password are invalid', '400');
    }

    const passwordIsWrong = !(await bcrypt.compare(password, user.password));

    if (passwordIsWrong) {
      throw new ApolloError('Email or password are invalid', '400');
    }

    const token = jwt.sign(
      {
        user: { ...user, password: undefined },
      },
      jwtConfig.secret,
      jwtConfig.options
    );

    return { user, token };
  }
}

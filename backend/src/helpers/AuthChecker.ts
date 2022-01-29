import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwtConfig';

export interface JWTPayload {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

export class AuthChecker {
  validateToken(auth: string) {
    if (!auth) {
      return false;
    }

    const [, token] = auth.split('Bearer ');

    if (!token) {
      return false;
    }

    try {
      const payload = jwt.verify(token, jwtConfig.secret) as JWTPayload;

      return payload;
    } catch {
      return false;
    }
  }
}

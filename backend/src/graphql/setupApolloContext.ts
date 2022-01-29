import { AuthChecker, JWTPayload } from '../helpers/AuthChecker';

export function setupApolloContext({ req }) {
  const token = req.headers.authorization;

  let user: undefined | JWTPayload['user'];

  const authChecker = new AuthChecker();
  const payload = authChecker.validateToken(token);

  if (payload) {
    user = payload.user;
  }

  return { token, user };
}

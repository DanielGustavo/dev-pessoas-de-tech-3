import { getCustomRepository } from 'typeorm';

import { UserRepository } from './UserRepository';

export const userRepository = getCustomRepository(UserRepository);

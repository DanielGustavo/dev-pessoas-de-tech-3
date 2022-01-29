import 'dotenv/config';
import { SignOptions } from 'jsonwebtoken';

const options: SignOptions = {
  expiresIn: '2h',
};

export default {
  secret: process.env.SECRET || 'secret',
  options,
};

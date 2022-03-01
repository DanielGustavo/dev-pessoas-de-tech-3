import { ForbiddenError } from 'apollo-server-express';

import { customerRepository } from '../db/repositories';

interface Request {
  name: string;
  email: string;
  phone?: string;
  site?: string;
  cnpj: string;
}

export class AddCustomerService {
  async execute({ name, email, phone, site, cnpj }: Request) {
    const emailAlreadyExists = !!(await customerRepository.findByEmail(email));
    if (emailAlreadyExists) {
      throw new ForbiddenError('This email is already in use');
    }

    const phoneAlreadyExists = !!(await customerRepository.findByPhone(phone));
    if (phoneAlreadyExists) {
      throw new ForbiddenError('This phone number is already in use');
    }

    const cnpjAlreadyExists = !!(await customerRepository.findByCnpj(cnpj));
    if (cnpjAlreadyExists) {
      throw new ForbiddenError('This CNPJ is already in use');
    }

    const customer = customerRepository.create({
      name,
      email,
      phone,
      site,
      cnpj,
    });

    return customerRepository.save(customer);
  }
}

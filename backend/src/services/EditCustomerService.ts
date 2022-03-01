import { ApolloError, ForbiddenError } from 'apollo-server-express';

import { customerRepository } from '../db/repositories';

import { getNonUndefinedFieldsFromObject } from '../utils/getNonUndefinedFieldsFromObject';

interface Request {
  fields: {
    name?: string;
    email?: string;
    phone?: string;
    site?: string;
    cnpj?: string;
  };
  customerId: string;
}

export class EditCustomerService {
  async execute({ fields, customerId }: Request) {
    const { email, phone, cnpj } = fields;

    const emailAlreadyExists = email
      ? !!(await customerRepository.findByEmail(email))
      : false;

    if (emailAlreadyExists) {
      throw new ForbiddenError('This email is already in use');
    }

    const phoneAlreadyExists = phone
      ? !!(await customerRepository.findByPhone(phone))
      : false;

    if (phoneAlreadyExists) {
      throw new ForbiddenError('This phone number is already in use');
    }

    const cnpjAlreadyExists = cnpj
      ? !!(await customerRepository.findByCnpj(cnpj))
      : false;

    if (cnpjAlreadyExists) {
      throw new ForbiddenError('This cnpj is already in use');
    }

    const changedFields = getNonUndefinedFieldsFromObject(fields);

    const customer = await customerRepository.findOne(customerId);

    if (!customer) {
      throw new ApolloError('This customer does not exist', '404');
    }

    Object.assign(customer, changedFields);
    await customerRepository.save(customer);

    return customer;
  }
}

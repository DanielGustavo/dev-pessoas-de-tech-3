import stream from 'stream';
import { UserInputError, ApolloError } from 'apollo-server-express';

import { customerRepository } from '../db/repositories';

import { LocalStorage } from '../helpers/LocalStorage';

interface Request {
  imageStream: stream.Readable;
  fileType: string;
  customerId: string;
}

export class AddCustomerProfilePictureService {
  async execute({ imageStream, fileType, customerId }: Request) {
    const fileIsNotAnImage = fileType.split('/')[0] !== 'image';

    if (fileIsNotAnImage) {
      throw new UserInputError('The file must be an image');
    }

    const customer = await customerRepository.findOne(customerId);

    if (!customer) {
      throw new ApolloError('This customer does not exist', '404');
    }

    const imageType = fileType.split('/')[1];
    const storageHelper = new LocalStorage();

    const filename = `${customer.id}.${imageType}`;
    customer.avatarFilename = filename;

    try {
      await storageHelper.upload({
        fileStream: imageStream,
        filename,
      });
    } catch {
      throw new ApolloError('We could not upload this file', '500');
    }

    await customerRepository.save(customer);

    return customer;
  }
}

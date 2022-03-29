import stream from 'stream';
import { UserInputError, ApolloError } from 'apollo-server-express';

import { employeeRepository } from '../db/repositories';

import { LocalStorage } from '../helpers/LocalStorage';

interface Request {
  imageStream: stream.Readable;
  fileType: string;
  employeeId: string;
}

export class AddEmployeeProfilePictureService {
  async execute({ imageStream, fileType, employeeId }: Request) {
    const fileIsNotAnImage = fileType.split('/')[0] !== 'image';

    if (fileIsNotAnImage) {
      throw new UserInputError('The file must be an image');
    }

    const employee = await employeeRepository.findOne(employeeId);

    if (!employee) {
      throw new ApolloError('This employee does not exist', '404');
    }

    const imageType = fileType.split('/')[1];
    const storageHelper = new LocalStorage();

    const filename = `${employee.id}.${imageType}`;
    employee.avatarFilename = filename;

    try {
      await storageHelper.upload({
        fileStream: imageStream,
        filename,
      });
    } catch {
      throw new ApolloError('We could not upload this file', '500');
    }

    await employeeRepository.save(employee);

    return employee;
  }
}

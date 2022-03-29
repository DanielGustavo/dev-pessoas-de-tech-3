import { v2 as cloudinary, UploadApiErrorResponse } from 'cloudinary';
import path from 'path';

import cloudinaryConfig from '../config/cloudinaryConfig';

import {
  StorageHelper,
  UploadProps,
  DeleteProps,
} from '../services/dependencies/StorageHelper';

export class CloudStorage implements StorageHelper {
  constructor() {
    cloudinary.config(cloudinaryConfig);
  }

  upload({ fileStream, filename }: UploadProps): Promise<boolean> {
    return new Promise((resolve) => {
      const folder = process.env.CLOUDINARY_FOLDER || 'ppw';
      const parsedFilename = path.parse(filename).name;

      function onUpload(error: UploadApiErrorResponse) {
        if (error) {
          throw new Error(error.message);
        }

        resolve(true);
      }

      const cloudinaryStream = cloudinary.uploader.upload_stream(
        { overwrite: true, public_id: parsedFilename, folder },
        onUpload
      );

      fileStream.pipe(cloudinaryStream);
    });
  }

  async delete({ filename }: DeleteProps) {
    try {
      const folder = process.env.CLOUDINARY_FOLDER || 'ppw';

      const parsedFilename = path.parse(filename).name;

      return !!(await cloudinary.uploader.destroy(
        `${folder}/${parsedFilename}`
      ));
    } catch (error) {
      throw new Error(error);
    }
  }
}

import fs from 'fs';
import { join } from 'path';

import {
  StorageHelper,
  UploadProps,
  DeleteProps,
} from '../services/dependencies/StorageHelper';

export class LocalStorage implements StorageHelper {
  private path = join(__dirname, '..', '..', 'uploads');

  upload({ fileStream, filename }: UploadProps): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const fullPath = join(this.path, filename);
      const writeableStream = fs.createWriteStream(fullPath);

      writeableStream.on('finish', () => {
        writeableStream.destroy();
        resolve(true);
      });

      fileStream.pipe(writeableStream).on('error', () => {
        writeableStream.destroy();
        reject(false);
      });
    });
  }

  async delete({ filename }: DeleteProps): Promise<boolean> {
    const fullPath = join(this.path, filename);
    const fileExists = await this.fileExists(fullPath);

    return new Promise((resolve, reject) => {
      if (!fileExists) {
        resolve(true);
        return;
      }

      try {
        fs.rm(fullPath, () => resolve(true));
      } catch {
        reject(false);
      }
    });
  }

  private fileExists(fullPath: string) {
    return new Promise((resolve) => {
      fs.stat(fullPath, (err) => {
        if (err === null) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}

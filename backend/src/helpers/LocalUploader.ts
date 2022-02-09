import fs from 'fs';
import stream from 'stream';
import { join } from 'path';

interface UploadProps {
  filename: string;
  fileStream: stream.Readable;
}

export class LocalUploader {
  private path = join(__dirname, '..', '..', 'uploads');

  upload({ fileStream, filename }: UploadProps) {
    return new Promise((resolve, reject) => {
      const fullPath = join(this.path, filename);
      const writeableStream = fs.createWriteStream(fullPath);

      writeableStream.on('finish', () => {
        writeableStream.destroy();
        resolve(true);
      });

      fileStream.pipe(writeableStream).on('error', () => {
        writeableStream.destroy();
        reject();
      });
    });
  }

  async delete({ filename }) {
    const fullPath = join(this.path, filename);
    const fileExists = await this.fileExists(fullPath);

    return new Promise((resolve) => {
      if (fileExists) {
        fs.rm(fullPath, () => resolve(true));
      } else {
        resolve(true);
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

import fs from 'fs';
import stream from 'stream';
import { join } from 'path';

interface UploadProps {
  filename: string;
  fileStream: stream.Readable;
}

export class LocalUploader {
  upload({ fileStream, filename }: UploadProps) {
    return new Promise((resolve, reject) => {
      const path = join(__dirname, '..', '..', 'uploads');

      const writeableStream = fs.createWriteStream(join(path, filename));

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
}

import stream from 'stream';

export interface UploadProps {
  filename: string;
  fileStream: stream.Readable;
}

export interface DeleteProps {
  filename: string;
}

export interface StorageHelper {
  upload({ fileStream, filename }: UploadProps): Promise<boolean>;
  delete({ filename }: DeleteProps): Promise<boolean>;
}

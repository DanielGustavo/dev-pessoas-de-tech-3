import { CloudStorage } from '../helpers/CloudStorage';
import { LocalStorage } from '../helpers/LocalStorage';

import { StorageHelper } from '../services/dependencies/StorageHelper';

export function storageHelperFactory(): StorageHelper {
  if (process.env.NODE_ENV === 'production') {
    return new CloudStorage();
  }

  return new LocalStorage();
}

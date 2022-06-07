import fs from 'fs';
import path from 'path';

export const copy = (pathToFile, pathToNewDirectory) => {
  const arr = pathToFile.split('/');
  const fileName = arr[arr.length - 1];

  if (!fs.existsSync(pathToFile)) {
    throw new Error();
  }

  fs.cpSync(pathToFile, path.join(pathToNewDirectory, fileName), { recursive: true });
}

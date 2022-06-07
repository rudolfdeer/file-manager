import fs from 'fs';
import path from 'path';

export const copy = (pathToFile, pathToNewDirectory) => {
  const arr = pathToFile.split('/');
  const fileName = arr[arr.length - 1];
  console.log('filename: ', fileName, 'path : ', pathToNewDirectory);
  if (!fs.existsSync(pathToFile)) {
    throw new Error(ERR_MESSAGE);
  }

  fs.cpSync(pathToFile, path.join(pathToNewDirectory, fileName), { recursive: true });
}
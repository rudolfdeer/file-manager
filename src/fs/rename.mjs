import fs from 'fs';

export const rename = (pathToFile, newFilename) => {
  if (!fs.existsSync(pathToFile)) {
    throw new Error();
  }
  fs.renameSync(pathToFile, newFilename);
};

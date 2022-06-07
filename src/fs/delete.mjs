import fs from 'fs';

export const remove = (pathToFile) => {
  if (!fs.existsSync(pathToFile)) {
    throw new Error(ERR_MESSAGE);
  }
  fs.unlinkSync(pathToFile);
}
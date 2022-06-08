import fs from 'fs';

export const goToDirectory = (directory) => {
  if (fs.lstatSync(directory).isDirectory()) {
    process.chdir(directory);
    return true;
  } else {
    return false;
  }
}

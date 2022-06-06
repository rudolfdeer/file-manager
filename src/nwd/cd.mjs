// Go to dedicated folder from current directory (path_to_directory can be relative or absolute)
// cd path_to_directory

import fs from 'fs';

export const goToDirectory = (directory) => {
  if (fs.lstatSync(directory).isDirectory()) {
    process.chdir(directory);
    return true;
  } else {
    return false;
  }
  
}
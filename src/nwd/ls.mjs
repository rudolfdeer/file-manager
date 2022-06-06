// List all files and folder in current directory and print it to console
// ls

import fs from 'fs';

export const listFilesInDirectory = async () => {
  fs.readdir(process.cwd(), (err, files) => {
    console.log(files);
  });
}


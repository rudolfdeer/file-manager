import fs from 'fs';

export const listFilesInDirectory = () => {
  const files = fs.readdirSync(process.cwd());
  console.log(files);
}

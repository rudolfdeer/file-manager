import fs from 'fs';

export const read = (pathToFile) => {
  if (!fs.existsSync(pathToFile)) {
    throw new Error();
  }
  const data = fs.readFileSync(pathToFile, { encoding: 'utf-8' });
  process.stdout.write(data);
};

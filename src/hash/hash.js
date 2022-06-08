import fs from 'fs';
import crypto from 'crypto';

export const calcHash = (pathToFile) => {
  if (!fs.existsSync(pathToFile)) {
    throw new Error();
  }
  const string = fs.readFileSync(pathToFile, { encoding: 'utf-8' });
  const result = crypto.createHash('sha256').update(string).digest('hex');
  process.stdout.write(result);
}

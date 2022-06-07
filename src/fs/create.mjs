import fs from 'fs';
import path from 'path';

export const create = (fileName) => {
  if (fs.existsSync(path.join(process.cwd(), fileName))) {
    throw new Error();
  }
  fs.writeFileSync(path.join(process.cwd(), fileName), '');
}

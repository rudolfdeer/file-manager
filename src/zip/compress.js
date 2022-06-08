import zlib from 'zlib';
import path from 'path';
import fs from 'fs';

export const compress = (pathToFile, pathToDestination) => {
  const arr = pathToFile.split('/');
  const fileName = arr[arr.length - 1].split('.')[0];
  const archiveName = `${fileName}.br`;
  const brotli = zlib.BrotliCompress();
  const input = fs.createReadStream(pathToFile);
  const output = fs.createWriteStream(path.join(pathToDestination, archiveName));

  input.pipe(brotli).pipe(output);
}

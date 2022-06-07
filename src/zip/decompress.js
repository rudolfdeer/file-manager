import zlib from 'zlib';
import path from 'path';
import fs from 'fs';

export const decompress = (pathToFile, pathToDestination) => {
  const arr = pathToFile.split('/');
  const archiveName = arr[arr.length - 1].split('.')[0];
  const fileName = `${archiveName}.txt`;
  const brotli = zlib.BrotliDecompress();
  const input = fs.createReadStream(pathToFile);
  const output = fs.createWriteStream(path.join(pathToDestination, fileName));

  input.pipe(brotli).pipe(output);
}

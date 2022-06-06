import { Transform } from 'stream';
import { read } from './fs/read.mjs';
import { goToDirectory } from './nwd/cd.mjs';
import { listFilesInDirectory } from './nwd/ls.mjs';
import { goToUpperDirectory } from './nwd/up.mjs';

class Transformer extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const inputString = chunk.toString().trim();

    let outputString;

    switch (inputString) {
      case 'up': {
        goToUpperDirectory();
        break;
      }

      case inputString.match(/^cd\s/)?.input: {
        const directory = inputString.split(' ')[1];
        try {
          goToDirectory(directory);
        } catch (err) {
          outputString = 'Invalid input';
        }
        break;
      }

      case 'ls': {
        listFilesInDirectory();
        break;
      }

      case inputString.match(/^cat\s/)?.input: {
        const pathToFile = inputString.split(' ')[1];
        try {
          read(pathToFile);
        } catch (err) {
          outputString = 'Invalid input\n';
        }
        break;
      }

      default: {
        outputString = 'Invalid input\n';
      }
    }

    const currentPathMsg = `You are currently in ${process.cwd()}\n`;

    this.push(`${outputString ? outputString : ''}\n${currentPathMsg}`);

    callback();
  }
}

export const transformer = () => new Transformer();
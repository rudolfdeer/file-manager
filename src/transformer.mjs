import { Transform } from 'stream';
import { copy } from './fs/copy.mjs';
import { create } from './fs/create.mjs';
import { remove } from './fs/delete.mjs';
import { move } from './fs/move.mjs';
import { read } from './fs/read.mjs';
import { rename } from './fs/rename.mjs';
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

      case inputString.match(/^add\s/)?.input: {
        const fileName = inputString.split(' ')[1];
        try {
          create(fileName);
        } catch (err) {
          outputString = 'Invalid input\n';
        }
        break;
      }

      case inputString.match(/^rn\s/)?.input: {
        const pathToFile = inputString.split(' ')[1];
        const newFilename = inputString.split(' ')[2];
        try {
          rename(pathToFile, newFilename);
        } catch (err) {
          outputString = 'Invalid input\n';
        }
        break;
      }

      case inputString.match(/^cp\s/)?.input: {
        const pathToFile = inputString.split(' ')[1];
        const pathToNewDirectory = inputString.split(' ')[2];
        try {
          copy(pathToFile, pathToNewDirectory);
        } catch (err) {
          outputString = 'Invalid input\n';
        }
        break;
      }

      case inputString.match(/^mv\s/)?.input: {
        const pathToFile = inputString.split(' ')[1];
        const pathToNewDirectory = inputString.split(' ')[2];
        try {
          move(pathToFile, pathToNewDirectory);
        } catch (err) {
          outputString = 'Invalid input\n';
        }
        break;
      }

      case inputString.match(/^rm\s/)?.input: {
        const pathToFile = inputString.split(' ')[1];
        try {
          remove(pathToFile);
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
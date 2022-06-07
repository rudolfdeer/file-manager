import { pipeline } from 'stream';
import os from 'os';
import { parser } from './src/parser.mjs';

const args = process.argv.slice(2);
const usernameLowerCase = args[0].split('=')[1];
const username = usernameLowerCase.charAt(0).toUpperCase() + usernameLowerCase.slice(1);

process.chdir(os.homedir());

const currentPathMsg = `You are currently in ${process.cwd()}\n`;
const welcomeMsg = `Welcome to the File Manager, ${username}!\n`;
const goodbyeMsg = `\nThank you for using File Manager, ${username}!\n`;

process.stdout.write(welcomeMsg);
process.stdout.write(currentPathMsg);

const inputStream = process.stdin;
const transformStream = parser(username);
const outputStream = process.stdout;

pipeline(inputStream, transformStream, outputStream, (err) => {
  if (err) {
    process.stderr.write(`Operation failed: ${err}\n`);
  }
});

process.on('SIGINT', () => {
  process.stdout.write(goodbyeMsg);
  process.exit();
})

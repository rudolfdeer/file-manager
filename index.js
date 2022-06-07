import { pipeline } from 'stream';
import { transformer } from './src/transformer.mjs'

const args = process.argv.slice(2);
const usernameLower = args[0].split('=')[1];
const username = usernameLower.charAt(0).toUpperCase() + usernameLower.slice(1);
const currentPathMsg = `You are currently in ${process.cwd()}\n`;


console.log(`Welcome to the File Manager, ${username}!\n`);
console.log(currentPathMsg);

const inputStream = process.stdin;
const transformStream = transformer();
const outputStream = process.stdout;

pipeline(inputStream, transformStream, outputStream, (err) => {
  if (err) {
    process.stderr.write(`Operation failed: ${err}\n`);
  }
});

process.on('SIGINT', () => {
  console.log(`\nThank you for using File Manager, ${username}!\n`);
  process.exit();
})




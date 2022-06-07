import os from 'os';

export const getEol = () => {
  console.log(JSON.stringify(os.EOL));
}

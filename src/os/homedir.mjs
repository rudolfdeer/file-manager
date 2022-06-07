import os from 'os';

export const getHomeDir = () => {
  console.log(os.homedir());
}

import os from 'os';

export const getCpus = () => {
  console.log(os.cpus());
}

import os from 'os';

export const getArchitecture = () => {
  console.log(os.arch());
}

import os from 'os';

export const getUsername = () => {
  console.log(os.userInfo().username);
}

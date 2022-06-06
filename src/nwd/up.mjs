// Navigation & working directory (nwd)
// Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)
// up

export const goToUpperDirectory = () => {
  process.chdir('../');
}
import { readdir } from 'fs/promises';
import { basename } from 'path';
const getFileNamesFromFolder = async (folder: string): Promise<string[]> => {
  const fileNames = await readdir(basename(folder));

  return fileNames;
};

export default getFileNamesFromFolder;

import fs from 'fs/promises';
import getFileNamesFromFolder from './getFileNamesFromFolder';

jest.mock('fs/promises', () => ({
  readdir: jest.fn(),
}));

it('calls fs.readdir function with the correct argument', async () => {

  await getFileNamesFromFolder('files');

  expect(fs.readdir).toHaveBeenCalledWith('files');
});

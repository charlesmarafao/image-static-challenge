import 'reflect-metadata';
import GetImageByPathEncryptedService from './GetImageByPathEncryptedService';
import FakeLogger from '@shared/infra/logger/fakes/FakeLogger';
import FakeCacheProvider from '../providers/CacheProvider/fakes/FakeCacheProvider';
import FakeCryptoProvider from '../providers/CryptoProvider/fakes/FakeCryptoProvider';
let fakeCryptoProvider: FakeCryptoProvider;
let getImageByPathEncryptedService: GetImageByPathEncryptedService;
let fakeCacheProvider: FakeCacheProvider;

const textEncrypted =
  '2161a8e64787342f63e7b9cb4823241d0ab18c2d117b024ed986a6bebc8e740418fe06d39999b9d8362fdc64797adabd';
describe('GetImageByPathEncryptedService', () => {
  beforeEach(() => {
    fakeCryptoProvider = new FakeCryptoProvider();
    fakeCacheProvider = new FakeCacheProvider();

    getImageByPathEncryptedService = new GetImageByPathEncryptedService(
      fakeCryptoProvider,
      fakeCacheProvider,
      FakeLogger,
    );
  });

  it('should be defined', () => {
    expect(getImageByPathEncryptedService.execute).toBeDefined();
  });

  it('should return string', async () => {
    expect(
      typeof (await getImageByPathEncryptedService.execute(textEncrypted)),
    ).toBe('string');
  });
  it('should be able to return', async () => {
    expect.assertions(1);

    const imageLinks = await getImageByPathEncryptedService.execute(
      textEncrypted,
    );
    expect(imageLinks).toBeTruthy();
  });

  it('should be able to return an string', async () => {
    expect.assertions(1);

    const imageLinks = await getImageByPathEncryptedService.execute(
      textEncrypted,
    );

    expect(imageLinks).toEqual(textEncrypted);
  });
  it('should be able to call decrypt', async () => {
    expect.assertions(1);

    const encrypt = jest.spyOn(fakeCryptoProvider, 'decrypt');

    await getImageByPathEncryptedService.execute(textEncrypted);

    expect(encrypt).toHaveBeenCalled();
  });
  it('should be able to call recover and save', async () => {
    expect.assertions(1);
    const recover = jest.spyOn(fakeCacheProvider, 'recover');

    await getImageByPathEncryptedService.execute(textEncrypted);

    expect(recover).toHaveBeenCalledWith(textEncrypted);
  });
});

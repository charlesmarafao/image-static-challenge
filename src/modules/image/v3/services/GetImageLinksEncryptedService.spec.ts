import 'reflect-metadata';
import GetImageLinksEncryptedService from './GetImageLinksEncryptedService';
import FakeLogger from '@shared/infra/logger/fakes/FakeLogger';
import FakeCacheProvider from '../providers/CacheProvider/fakes/FakeCacheProvider';
import FakeCryptoProvider from '../providers/CryptoProvider/fakes/FakeCryptoProvider';
let fakeCryptoProvider: FakeCryptoProvider;
let getImageLinksEncryptedService: GetImageLinksEncryptedService;
let fakeCacheProvider: FakeCacheProvider;

describe('GetImageLinksEncryptedService', () => {
  beforeEach(() => {
    fakeCryptoProvider = new FakeCryptoProvider();
    fakeCacheProvider = new FakeCacheProvider();

    getImageLinksEncryptedService = new GetImageLinksEncryptedService(
      fakeCryptoProvider,
      fakeCacheProvider,
      FakeLogger,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 20, 10).getTime();
    });
  });

  it('should be defined', () => {
    expect(getImageLinksEncryptedService.execute).toBeDefined();
  });

  it('should return object', () => {
    expect(typeof getImageLinksEncryptedService.execute(5)).toBe('object');
  });
  it('should be able to return', async () => {
    expect.assertions(1);

    const imageLinks = await getImageLinksEncryptedService.execute(5);
    expect(imageLinks).toBeTruthy();
  });

  it('should be able to return an array of objects', async () => {
    expect.assertions(1);

    const imageLinks = await getImageLinksEncryptedService.execute(5);

    expect(imageLinks).toEqual(expect.arrayContaining([expect.any(Object)]));
  });
  it('should be able to call encrypt', async () => {
    expect.assertions(1);

    const encrypt = jest.spyOn(fakeCryptoProvider, 'encrypt');

    await getImageLinksEncryptedService.execute(5);

    expect(encrypt).toHaveBeenCalled();
  });
  it('should be able to call recover and save', async () => {
    expect.assertions(2);
    const recover = jest.spyOn(fakeCacheProvider, 'recover');
    const save = jest.spyOn(fakeCacheProvider, 'save');

    await getImageLinksEncryptedService.execute(5);

    expect(recover).toHaveBeenCalledWith('links');
    expect(save).toBeCalledTimes(7);
  });
});

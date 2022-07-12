import { injectable, inject } from 'tsyringe';
import ICryptoProvider from '@modules/image/v3/providers/CryptoProvider/models/ICryptoProvider';
import ICacheProvider from '@modules/image/v3/providers/CacheProvider/models/ICacheProvider';

import ILogger from '@shared/infra/logger/interfaces/ILogger';
import getFileNamesFromFolder from '../utils/getFileNamesFromFolder';
import makeImageUrl from '../utils/makeImageUrl';
import getUnixTimestamp from '../utils/getUnixTimestamp';

export type Link = {
  uri: string;
};

@injectable()
class GetImageLinksEncryptedService {
  private cacheProvider: ICacheProvider;
  private cryptoProvider: ICryptoProvider;

  constructor(
    @inject('CryptoProvider') cryptoProvider: ICryptoProvider,
    @inject('CacheProvider') cacheProvider: ICacheProvider,
    @inject('logger') private logger: ILogger,
  ) {
    this.cacheProvider = cacheProvider;
    this.cryptoProvider = cryptoProvider;
  }

  public async execute(expirationInSeconds: number): Promise<Link[]> {
    const fileNames = await getFileNamesFromFolder('files');
    const now = getUnixTimestamp();
    const expirationTime = now + expirationInSeconds;
    const ttl = {
      TTL: expirationInSeconds,
    };

    const cachedLinks = this.cacheProvider.recover<Link[]>('links');
    if (cachedLinks) {
      this.logger.log('info', 'Serving with links cached', { cachedLinks });
      return cachedLinks;
    }

    const uri = (filePathEncrypted: string) => {
      return makeImageUrl(filePathEncrypted);
    };
    const links = fileNames.map(file => {
      console.log(expirationTime);
      const fileEncrypted = this.cryptoProvider.encrypt(
        `${file}?expiration_time=${expirationTime}`,
      );

      this.cacheProvider.save(fileEncrypted, file, ttl);

      return {
        uri: uri(fileEncrypted),
      };
    });

    this.cacheProvider.save('links', links, ttl);

    this.logger.log('info', 'listing links', { links });
    return links;
  }
}

export default GetImageLinksEncryptedService;

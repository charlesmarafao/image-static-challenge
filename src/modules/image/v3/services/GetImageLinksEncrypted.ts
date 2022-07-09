import { injectable, inject } from 'tsyringe';
import { readdir } from 'fs/promises';
import { basename } from 'path';
import ICryptoProvider from '@modules/image/v3/providers/CryptoProvider/models/ICryptoProvider';
import ILogger from '@shared/infra/logger/interfaces/ILogger';

interface IRequest {
  origin: string;
  from: string;
  to: string;
  contents: Contents;
  unique_id: string;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface Contents {
  type: string;
  text?: string;
  fields?: { [key: string]: string };
}

@injectable()
class GetImageLinksEncrypted {
  constructor(
    @inject('CryptoProvider') private cryptoProvider: ICryptoProvider,
    @inject('logger') private logger: ILogger,
  ) {}

  public async execute(expirationInSeconds: number): Promise<any> {
    const fileNames = await readdir(basename('files'));
    const now = Math.floor(Date.now() / 1000);
    const expirationTime = now + expirationInSeconds;

    const links = fileNames.map(file => {
      return {
        url:
          'https://im-challenge.herokuapp.com/api/v3/images/static/' +
          this.cryptoProvider.encrypt(
            file + '?expiration_time=' + expirationTime,
          ),
      };
    });

    this.logger.log('info', 'listing ', { fileNames });
    this.logger.log('info', 'listing address', { links });
    return links;
  }
}

export default GetImageLinksEncrypted;

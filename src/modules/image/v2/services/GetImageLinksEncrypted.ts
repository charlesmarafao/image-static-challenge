import { injectable, inject } from 'tsyringe';
import { readdir } from 'fs/promises';
import { basename } from 'path';
import ICryptoProvider from '@modules/image/v2/providers/CryptoProvider/models/ICryptoProvider';
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

  public async execute(): Promise<any> {
    const fileNames = await readdir(basename('files'));

    const links = fileNames.map(file => {
      return {
        url:
          'https://im-challenge.herokuapp.com/v2/images/static/' +
          this.cryptoProvider.encrypt(file),
      };
    });

    this.logger.log('info', 'listing ', { fileNames });
    this.logger.log('info', 'listing address', { links });
    return links;
  }
}

export default GetImageLinksEncrypted;

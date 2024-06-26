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
class GetImageByPathEncryptedService {
  constructor(
    @inject('CryptoProvider') private cryptoProvider: ICryptoProvider,
    @inject('logger') private logger: ILogger,
  ) {}

  public async execute(text: string): Promise<any> {
    const image = this.cryptoProvider.decrypt(text);

    this.logger.log('info', 'getting image', { image });
    return image;
  }
}

export default GetImageByPathEncryptedService;

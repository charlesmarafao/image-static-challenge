import { injectable, inject } from 'tsyringe';
import ICryptoProvider from '@modules/image/v3/providers/CryptoProvider/models/ICryptoProvider';
import ILogger from '@shared/infra/logger/interfaces/ILogger';
import removeParameterFromPathAndReturn from '../utils/removeParameterFromPathAndReturn';
import isExpired from '../utils/isExpired';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '../providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetImageByPathEncryptedService {
  constructor(
    @inject('CryptoProvider') private cryptoProvider: ICryptoProvider,
    @inject('CacheProvider') private cacheProvider: ICacheProvider,
    @inject('logger') private logger: ILogger,
  ) {}

  public async execute(text: string): Promise<string> {
    try {
      const image = this.cryptoProvider.decrypt(text);

      const { path: imagePath, value: imageExpirationTime } =
        removeParameterFromPathAndReturn(image, 'expiration_time');

      const cachedImage = this.cacheProvider.recover<string>(text.toString());
      if (cachedImage) {
        this.logger.log('info', 'Serving with image cached', { cachedImage });
        return cachedImage;
      }

      if (isExpired(imageExpirationTime))
        throw new AppError('Image URL is expired', {}, 404);

      return imagePath;
    } catch (error) {
      throw new AppError('Image not found', {}, 404);
    }
  }
}

export default GetImageByPathEncryptedService;

import { container } from 'tsyringe';
import PinoLogger from '@shared/infra/logger/implementations/PinoLogger';
import ILogger from '@shared/infra/logger/interfaces/ILogger';
import ICryptoProvider from '@modules/image/v2/providers/CryptoProvider/models/ICryptoProvider';
import CryptoProvider from '@modules/image/v2/providers/CryptoProvider/implementations/CryptoProvider';

container.registerSingleton<ICryptoProvider>('CryptoProvider', CryptoProvider);
container.registerInstance<ILogger>('logger', PinoLogger);

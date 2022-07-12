import { container } from 'tsyringe';
import PinoLogger from '@shared/infra/logger/implementations/PinoLogger';
import ILogger from '@shared/infra/logger/interfaces/ILogger';
import ICryptoProvider from '@modules/image/v3/providers/CryptoProvider/models/ICryptoProvider';
import CryptoProvider from '@modules/image/v3/providers/CryptoProvider/implementations/CryptoProvider';

import ICacheProvider from '@modules/image/v3/providers/CacheProvider/models/ICacheProvider';
import CacheProvider from '@modules/image/v3/providers/CacheProvider/implementations/InMemoryCacheProvider';

container.registerSingleton<ICryptoProvider>('CryptoProvider', CryptoProvider);
container.registerSingleton<ICacheProvider>('CacheProvider', CacheProvider);
container.registerInstance<ILogger>('logger', PinoLogger);

import { container } from 'tsyringe';
import ICryptoProvider from '@modules/image/v2/providers/CryptoProvider/models/ICryptoProvider';
import CryptoProvider from '@modules/image/v2/providers/CryptoProvider/implementations/CryptoProvider';

container.registerSingleton<ICryptoProvider>('CryptoProvider', CryptoProvider);

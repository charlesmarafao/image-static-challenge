import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';

import InMemoryCacheProvider from './implementations/InMemoryCacheProvider';

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  InMemoryCacheProvider,
);

import appConfig from '@config/app';

import 'reflect-metadata';
import app from './app';

app.listen(appConfig.port, () =>
  console.log(`⚡️ Server listening on port ${appConfig.port}`),
);

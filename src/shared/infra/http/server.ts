import 'reflect-metadata';
import appConfig from '@config/app';
import app from './app';
import ILogger from '../logger/interfaces/ILogger';
import { container } from 'tsyringe';

const logger = container.resolve<ILogger>('logger');

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  logger.log(
    'error',
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`,
  );
  // lets throw the error and let the uncaughtException handle below handle it
  throw reason;
});

process.on('uncaughtException', error => {
  logger.log('error', `App exiting due to an uncaught exception: ${error}`);
  process.exit(ExitStatus.Failure);
});

(async (): Promise<void> => {
  try {
    app.listen(appConfig.port, () =>
      console.log(`⚡️ Server listening on port ${appConfig.port}`),
    );

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

    // eslint-disable-next-line no-restricted-syntax
    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          logger.log('info', `App exited with success`);
          process.exit(ExitStatus.Success);
        } catch (error) {
          logger.log('error', `App exited with error: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      });
    }
  } catch (error) {
    logger.log('error', `App exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  }
})();

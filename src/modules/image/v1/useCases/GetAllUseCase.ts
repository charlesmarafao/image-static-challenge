import ILogger from '@shared/infra/logger/interfaces/ILogger';
import { inject, injectable } from 'tsyringe';
import { readdir } from 'fs/promises';
import { basename } from 'path';

@injectable()
export default class GetAllUseCase {
  constructor(@inject('logger') private logger: ILogger) {}

  public async execute(): Promise<any> {
    const fileNames = await readdir(basename('files'));

    const links = fileNames.map(file => {
      return { url: 'http://localhost:8092/api/v1/images/' + file };
    });

    this.logger.log('info', 'listing address', { links });
    return links;
  }
}

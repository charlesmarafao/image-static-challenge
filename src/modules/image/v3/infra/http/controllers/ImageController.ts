import GetImageLinksEncryptedService, {
  Link,
} from '@modules/image/v3/services/GetImageLinksEncryptedService';
import GetImageByPathEncryptedService from '@modules/image/v3/services/GetImageByPathEncryptedService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { basename } from 'path';

export default class imageController {
  public async index(
    request: Request<any, any, any, any>,
    response: Response,
  ): Promise<Response<Link[]>> {
    const getImageLinks = container.resolve(GetImageLinksEncryptedService);
    const expirationInSeconds = Number(request.query.expiration_time) || 5;
    const data = await getImageLinks.execute(expirationInSeconds);
    return response.json(data);
  }
  public async file(
    request: Request<any, any, any, any>,
    response: Response,
  ): Promise<void> {
    const getImageByPathEncrypted = container.resolve(
      GetImageByPathEncryptedService,
    );

    const image = await getImageByPathEncrypted.execute(
      request.params.encrypted,
    );

    response.sendFile(image, { root: basename('files') });
  }
}

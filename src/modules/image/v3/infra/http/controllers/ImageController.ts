import GetImageLinksEncrypted from '@modules/image/v3/services/GetImageLinksEncrypted';
import GetImageByPathEncrypted from '@modules/image/v3/services/GetImageByPathEncrypted';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { basename } from 'path';

export default class imageController {
  public async index(
    request: Request<any, any, any, any>,
    response: Response,
  ): Promise<Response> {
    const getImageLinks = container.resolve(GetImageLinksEncrypted);
    const expirationInSeconds = Number(request.query.expiration_time) || 5;
    const data = await getImageLinks.execute(expirationInSeconds);
    return response.json(data);
  }
  public async file(
    request: Request<any, any, any, any>,
    response: Response,
  ): Promise<void> {
    const getImageByPathEncrypted = container.resolve(GetImageByPathEncrypted);

    const image = await getImageByPathEncrypted.execute(
      request.params.encrypted,
    );
    var matches = image.match(/expiration_time=([^&]*)/);
    var path = image.replace(/\?\expiration_time=([^&]*)/, '');

    if (matches[1] < Math.floor(+new Date() / 1000)) {
      response.send(404);
    } else {
      response.sendFile(path, { root: basename('files') });
    }
    console.log(matches[1]);
    console.log(Math.floor(+new Date() / 1000));
  }
}

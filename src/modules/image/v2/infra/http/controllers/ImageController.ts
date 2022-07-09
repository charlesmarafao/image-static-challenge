import GetImageLinksEncrypted from '@modules/image/v2/services/GetImageLinksEncrypted';
import GetImageByPathEncrypted from '@modules/image/v2/services/GetImageByPathEncrypted';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { basename } from 'path';

export default class imageController {
  public async index(
    request: Request<any, any, any, any>,
    response: Response,
  ): Promise<Response> {
    const getImageLinks = container.resolve(GetImageLinksEncrypted);
    const data = await getImageLinks.execute();
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

    console.log(request.params.encrypted);

    response.sendFile(image, { root: basename('files') });
  }
}

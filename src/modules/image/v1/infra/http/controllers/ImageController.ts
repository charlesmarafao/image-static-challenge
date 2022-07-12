import GetAllUseCase from '@modules/image/v1/useCases/GetAllUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
export default class imageController {
  public async index(
    request: Request<any, any, any, any>,
    response: Response,
  ): Promise<Response> {
    const imageUseCase = container.resolve(GetAllUseCase);
    const data = await imageUseCase.execute();
    return response.json(data);
  }
}

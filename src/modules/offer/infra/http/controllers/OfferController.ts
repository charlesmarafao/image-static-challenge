import CreateOfferUseCase from '@modules/offer/useCases/CreateOfferUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
export default class OfferController {
  public async index(
    request: Request<any, any, any, any>,
    response: Response,
  ): Promise<Response> {
    return response.json({ message: 'Offer' });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { offers, hotel_id } = request.body;
    const createOffer = container.resolve(CreateOfferUseCase);
    await createOffer.execute({
      offer: offers,
      hotel_id,
    });

    return response.status(201).send();
  }
}

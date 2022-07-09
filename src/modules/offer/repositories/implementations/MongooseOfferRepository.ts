import OfferMongoose from '@modules/offer/infra/mongoose/schemas/Offer';
import IOfferRepository, { IOfferRequest } from '../IOfferRepository';

export default class MongooseOfferRepository implements IOfferRepository {
  async create(offer: IOfferRequest[]): Promise<Offer[] | undefined> {
    const response = await OfferMongoose.insertMany(offer);

    if (response) {
      return response;
    }
    return;
  }
}

import IHotelRepository from '@modules/hotel/repositories/IHotelRepository';
import AppError from '@shared/errors/AppError';
import ILogger from '@shared/infra/logger/interfaces/ILogger';
import { inject, injectable } from 'tsyringe';
import IOfferRepository from '../repositories/IOfferRepository';

interface Offer {
  checkInDate: Date;
  checkOutDate: Date;
  price: number;
  available: boolean;
}

interface IRequest {
  offer: Offer[];
  hotel_id: any;
}

@injectable()
export default class CreateOfferUseCase {
  constructor(
    @inject('logger') private logger: ILogger,
    @inject('HotelRepository') private hotelRepository: IHotelRepository,
    @inject('OfferRepository') private offerRepository: IOfferRepository,
  ) {}

  public async execute({ offer, hotel_id }: IRequest): Promise<Offer[] | any> {
    this.logger.log('info', 'checking isset hotel', { offer });

    const findByHotel = await this.hotelRepository.findById(hotel_id);
    if (!findByHotel) {
      throw new AppError('Hotel not found.', {}, 404);
    }
    this.logger.log('info', 'creating offer', { offer });

    const addedOffer = await this.offerRepository.create(offer);
    if (!addedOffer) {
      throw new AppError('Hotel - not create.');
    }
    const offers_id = addedOffer?.map(item => item._id || '');
    this.logger.log('info', 'created offer', { addedOffer });

    this.logger.log('info', 'adding to hotel valid', { offers_id });
    const insertInHotelDocument = await this.hotelRepository.addOffer({
      hotel_id,
      offers_id,
    });
    this.logger.log('info', 'added hotel into address', {
      insertInHotelDocument,
    });
    return addedOffer;
  }
}

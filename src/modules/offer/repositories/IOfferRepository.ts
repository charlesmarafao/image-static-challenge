export type IOfferRequest = {
  checkInDate: Date;
  checkOutDate: Date;
  price: number;
  available: boolean;
};

export default interface IOfferRepository {
  create(offer: IOfferRequest[]): Promise<Offer[] | undefined>;
}

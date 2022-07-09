import mongoose, { Document, Model, Schema } from 'mongoose';

export type OfferAttributes = {
  checkInDate: Date;
  checkOutDate: Date;
  price: number;
  available: boolean;
  _id?: string;
};

export type OfferDocument = Document & OfferAttributes;

type OfferModel = Model<OfferDocument>;

const OfferSchema = new Schema(
  {
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    price: { type: Number, required: true },
    available: { type: String, required: true },
  },
  {
    collection: 'offer',
    strict: true,
    timestamps: true,
  },
);

const OfferMongoose = mongoose.model<OfferDocument, OfferModel>(
  'Offer',
  OfferSchema,
);

export default OfferMongoose;

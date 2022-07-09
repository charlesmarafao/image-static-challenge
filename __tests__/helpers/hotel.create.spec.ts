/* eslint-disable import-helpers/order-imports */
import 'reflect-metadata';
import AddressMongoose from '@modules/address/infra/mongoose/schemas/Address';
import addressFactory from '@modules/hotel/factories/addressFactory';
import app from '@shared/infra/http/app';
import MongoDBMock from '@shared/infra/mongoose/fakes/MongoDBMock';
import request from 'supertest';
import hotelFactory from '@modules/hotel/factories/hotelFactory';
import HotelMongoose from '@modules/hotel/infra/mongoose/schemas/Hotel';
process.env.NODE_ENV = 'testing';
jest.mock('axios');
const arrayAddressFactory: Address[] = [];
const arrayHotelFactory: Hotel[] = [];

describe('hotel.create', () => {
  beforeAll(async () => {
    await MongoDBMock.connect();
    await HotelMongoose.deleteMany({});
    await AddressMongoose.deleteMany({});
    jest.setTimeout(4000);
  });
  afterAll(async () => {
    MongoDBMock.disconnect();
  });
  beforeEach(async () => {
    await HotelMongoose.deleteMany({});
    await AddressMongoose.deleteMany({});
  });

  it('should create hotel ', async () => {
    arrayAddressFactory.push(addressFactory());
    const requestAddressInsert = await AddressMongoose.insertMany(
      arrayAddressFactory,
    );
    arrayHotelFactory.push(hotelFactory());
    await HotelMongoose.insertMany(arrayHotelFactory);

    const createReponse = await request(app).post(`/api/v1/hotel/`).send({
      address_id: requestAddressInsert[0]._id,
      hotel: arrayHotelFactory,
    });
    expect(createReponse.status).toBe(201);
  });
  it('should not create when address_id not exist ', async () => {
    arrayAddressFactory.push(addressFactory());
    await AddressMongoose.insertMany(arrayAddressFactory);
    arrayHotelFactory.push(hotelFactory());
    await HotelMongoose.insertMany(arrayHotelFactory);

    const createReponse = await request(app).post(`/api/v1/hotel/`).send({
      address_id: 'f93f80ab-349a-4ecd-8bea-757b6957d2c6',
      hotel: arrayHotelFactory,
    });
    expect(createReponse.status).toBe(404);
  });
});

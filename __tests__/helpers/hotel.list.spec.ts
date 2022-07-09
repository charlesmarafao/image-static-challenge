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

describe('hotel.list', () => {
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

  it('should list hotel ', async () => {
    arrayAddressFactory.push(addressFactory());
    await AddressMongoose.insertMany(arrayAddressFactory);
    arrayHotelFactory.push(hotelFactory());
    const requestCreateHOtel = await HotelMongoose.insertMany(
      arrayHotelFactory,
    );

    const createReponse = await request(app).get(
      `/api/v1/hotel/${requestCreateHOtel[0]._id}`,
    );
    expect(createReponse.status).toBe(200);
    expect(createReponse.body.data.name).toBe(requestCreateHOtel[0].name);
  });
  it('should return 500 bad parmater ', async () => {
    const createReponse = await request(app).get(
      `/api/v1/hotel/f93f80ab-349a-4ecd-8bea-757b6957d2c6`,
    );
    expect(createReponse.status).toBe(500);
  });
  it('should return 404 ', async () => {
    const createReponse = await request(app).get(
      `/api/v1/hotel/629f987db99fb9e9e573701b`,
    );
    expect(createReponse.status).toBe(404);
  });
});

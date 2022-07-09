/* eslint-disable import-helpers/order-imports */
import 'reflect-metadata';
import AddressMongoose from '@modules/address/infra/mongoose/schemas/Address';
import addressFactory from '@modules/hotel/factories/addressFactory';
import app from '@shared/infra/http/app';
import MongoDBMock from '@shared/infra/mongoose/fakes/MongoDBMock';
import request from 'supertest';
process.env.NODE_ENV = 'testing';
jest.mock('axios');
const arrayAddressFactory: Address[] = [];
arrayAddressFactory.push(addressFactory());
arrayAddressFactory.push(addressFactory());
arrayAddressFactory.push(addressFactory());
describe('address.create', () => {
  beforeAll(async () => {
    await MongoDBMock.connect();
    await AddressMongoose.deleteMany({});
    jest.setTimeout(4000);
  });
  afterAll(async () => {
    MongoDBMock.disconnect();
  });
  beforeEach(async () => {
    await AddressMongoose.deleteMany({});
  });

  it('should create address ', async () => {
    const createReponse = await request(app).post('/api/v1/address').send({
      address: arrayAddressFactory,
    });
    expect(createReponse.status).toBe(201);
  });
});

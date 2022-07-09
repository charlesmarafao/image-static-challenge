/* eslint-disable import-helpers/order-imports */
import 'reflect-metadata';
import AddressMongoose from '@modules/address/infra/mongoose/schemas/Address';
import addressFactory from '@modules/hotel/factories/addressFactory';
import app from '@shared/infra/http/app';
import MongoDBMock from '@shared/infra/mongoose/fakes/MongoDBMock';
import request from 'supertest';
import AppError from '@shared/errors/AppError';

process.env.NODE_ENV = 'testing';

jest.mock('axios');
const arrayAddressFactory: Address[] = [];
arrayAddressFactory.push(addressFactory());
arrayAddressFactory.push(addressFactory());
arrayAddressFactory.push(addressFactory());
describe('address.list', () => {
  beforeAll(async () => {
    await MongoDBMock.connect();
    await AddressMongoose.deleteMany({});
    jest.setTimeout(4000);
  });
  afterAll(async () => {
    await MongoDBMock.disconnect();
  });
  beforeEach(async () => {
    await AddressMongoose.deleteMany({});
  });

  it('should list address ', async () => {
    await AddressMongoose.insertMany(arrayAddressFactory);
    const createReponse = await request(app).get('/api/v1/address');

    expect(createReponse.status).toBe(200);
    expect(createReponse.body.length).toBe(3);
  });
  it('should list address by id ', async () => {
    const addRequest = await AddressMongoose.insertMany(arrayAddressFactory);

    const createReponse = await request(app).get(
      `/api/v1/address/${addRequest[0]._id}`,
    );
    expect(createReponse.status).toBe(200);
    expect(createReponse.body._id).toBe(addRequest[0]._id);
  });
  it('should list address by search term ', async () => {
    await AddressMongoose.insertMany([
      { ...addressFactory(), cityName: 'Liverpool' },
    ]);

    const createReponse = await request(app).get(
      `/api/v1/address/search/?term=Liver`,
    );
    expect(createReponse.status).toBe(200);
    expect(createReponse.body[0].cityName).toBe('Liverpool');
  });
  it('should return 404 when not find ', async () => {
    await AddressMongoose.insertMany([
      { ...addressFactory(), cityName: 'Liverpool' },
    ]);

    const createReponse = await request(app).get(
      `/api/v1/address/search/7897rwrer7ew`,
    );
    expect(createReponse.status).toBe(404);
  });
});

/* eslint-disable import-helpers/order-imports */
import 'reflect-metadata';
import app from '@shared/infra/http/app';
import request from 'supertest';

process.env.NODE_ENV = 'testing';

jest.mock('axios');

describe('List Image Links', () => {
  it('should list image links ', async () => {
    const createReponse = await request(app).get('/api/v3/images/links');

    expect(createReponse.status).toBe(200);
    expect(createReponse.body.length).toBe(6);
  });

  it('should return 404 if route is wrong ', async () => {
    const createReponse = await request(app).get(`/api/v3/images/link`);
    expect(createReponse.status).toBe(404);
  });
});

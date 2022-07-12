/* eslint-disable import-helpers/order-imports */
import 'reflect-metadata';
import app from '@shared/infra/http/app';
import request from 'supertest';
import { isBufferSameAsFile } from './utils';

process.env.NODE_ENV = 'testing';

jest.mock('axios');

describe('List Image Links', () => {
  const pathToImage = './files/shrek.jpeg';
  it('should get static image', async () => {
    const imageLinks = await request(app).get(`/api/v3/images/links`);

    const imageURI = imageLinks.body[0].uri;
    const url = new URL(imageURI);

    const createReponse = await request(app).get(url.pathname);

    expect(createReponse.status).toBe(200);
    expect(isBufferSameAsFile(createReponse.body, pathToImage));
  });
  it('should not be able to get static image expired', async () => {
    // jest.useFakeTimers();
    const imageLinks = await request(app)
      .get(`/api/v3/images/links`)
      .query({ expiration_time: 1000 });

    const imageURI = imageLinks.body[0].uri;
    const url = new URL(imageURI);

    jest.advanceTimersByTime(2000);

    const createReponse = await request(app).get(url.pathname);

    expect(createReponse.status).toBe(404);
  });

  it('should return 404 if path encrypted is wrong', async () => {
    const createReponse = await request(app).get(`/api/v3/images/static/21312`);
    expect(createReponse.status).toBe(404);
  });
});

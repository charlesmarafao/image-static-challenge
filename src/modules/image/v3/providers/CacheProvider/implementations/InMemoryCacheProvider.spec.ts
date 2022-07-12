import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import { container } from 'tsyringe';

import InMemoryCacheProvider from './InMemoryCacheProvider';
let cache = container.resolve(InMemoryCacheProvider);

const valueMock = [{ uri: 'someUrI' }];
const key = 'someKey';

beforeEach(() => {
  cache = container.resolve(InMemoryCacheProvider);
});

test('should properly save results to cache', async () => {
  cache.save(key, { valueMock });
  cache.save('1', { new: '' });
  expect(cache.cache).toEqual(
    new Map([
      [key, { valueMock }],
      ['1', { new: '' }],
    ]),
  );
});

test('should throw an error when key is not a string', async () => {
  expect(() => {
    // @ts-ignore
    cache.save({}, valueMock);
  }).toThrow(AppError);

  expect(() => {
    // @ts-ignore
    cache.save({}, valueMock);
  }).toThrow('Key should be a string, got object');
});

test('should return false for delete non-exist key', async () => {
  expect(cache.invalidate(key)).toBe(false);
});

test('should delete record from cache and return true', async () => {
  cache.save(key, valueMock);
  expect(cache.invalidate(key)).toBe(true);
  expect(cache.cache).toEqual(new Map());
});

test('should delete record with TTL', async () => {
  cache.save(key, valueMock, { TTL: 2 });
  expect(cache.cache).toEqual(new Map([[key, valueMock]]));
  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(cache.cache).toEqual(new Map());
});

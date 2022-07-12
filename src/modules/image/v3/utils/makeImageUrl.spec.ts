import AppError from '@shared/errors/AppError';
import makeImageUrl from './makeImageUrl';

const path = 'path.jpeg'
const pathWithParameters = 'path.jpeg?expiration_time=4119013851'
describe('makeImageUrl', () => {
  it('should be defined', () => {
    expect(makeImageUrl).toBeDefined();
  });

  it('should return boolean', () => {
    expect(typeof makeImageUrl(path)).toBe('string');
  });


  test('should throw an error when key is not a string', async () => {
    expect(() => {
      // @ts-ignore
      makeImageUrl()
    }).toThrow(AppError);

    expect(() => {
      // @ts-ignore
      makeImageUrl()
    }).toThrow('A path is required to make a url');
  });

  it('should return the correct path', () => {
    expect(makeImageUrl(path)).toBe('http://localhost:9090/api/v3/images/static/path.jpeg');
  });

  it('should return the correct path with parameters', () => {
    expect(makeImageUrl(pathWithParameters)).toBe('http://localhost:9090/api/v3/images/static/path.jpeg?expiration_time=4119013851');
  });
});

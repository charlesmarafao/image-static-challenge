import AppError from '@shared/errors/AppError';
import removeParameterFromPathAndReturn from './removeParameterFromPathAndReturn';

const path = 'path.jpeg?expiration_time=4119013851'
const parameter = 'expiration_time'
describe('removeParameterFromPathAndReturn', () => {
  it('should be defined', () => {
    expect(removeParameterFromPathAndReturn).toBeDefined();
  });

  it('should return object', () => {
    expect(typeof removeParameterFromPathAndReturn(path, parameter)).toBe('object');
  });

  test('should throw an error when ImagePath and Parameter', async () => {
    expect(() => {
      // @ts-ignore
      removeParameterFromPathAndReturn()
    }).toThrow(AppError);

    expect(() => {
      // @ts-ignore
      removeParameterFromPathAndReturn()
    }).toThrow('ImagePath and Parameter is required');
  });

  it('should return the correct object', () => {
    expect(removeParameterFromPathAndReturn(path, parameter)).toStrictEqual({"path": "path.jpeg", "value": 4119013851});
  });

});

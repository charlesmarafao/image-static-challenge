import isExpired from './isExpired';

const future = 4119013851
const past = 1657564251
describe('isExpired', () => {
  it('should be defined', () => {
    expect(isExpired).toBeDefined();
  });

  it('should return boolean', () => {
    expect(typeof isExpired(future)).toBe('boolean');
  });

  it('should return true', () => {
    expect(isExpired(past)).toBe(true);
  });
  it('should return false', () => {
    expect(isExpired(future)).toBe(false);
  });
});

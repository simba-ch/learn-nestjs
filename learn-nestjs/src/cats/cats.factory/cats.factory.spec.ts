import { CatsFactory } from './cats.factory';

describe('CatsFactory', () => {
  it('should be defined', () => {
    expect(new CatsFactory()).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { Custom } from './custom';

describe('Custom', () => {
  let provider: Custom;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Custom],
    }).compile();

    provider = module.get<Custom>(Custom);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

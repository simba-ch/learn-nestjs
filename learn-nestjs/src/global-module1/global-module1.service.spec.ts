import { Test, TestingModule } from '@nestjs/testing';
import { GlobalModule1Service } from './global-module1.service';

describe('GlobalModule1Service', () => {
  let service: GlobalModule1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalModule1Service],
    }).compile();

    service = module.get<GlobalModule1Service>(GlobalModule1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

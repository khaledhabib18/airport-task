import { Test, TestingModule } from '@nestjs/testing';
import { BaggagesResolver } from './baggages.resolver';

describe('BaggagesResolver', () => {
  let resolver: BaggagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaggagesResolver],
    }).compile();

    resolver = module.get<BaggagesResolver>(BaggagesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

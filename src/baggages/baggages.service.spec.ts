import { Test, TestingModule } from '@nestjs/testing';
import { BaggagesService } from './baggages.service';

describe('BaggagesService', () => {
  let service: BaggagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaggagesService],
    }).compile();

    service = module.get<BaggagesService>(BaggagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

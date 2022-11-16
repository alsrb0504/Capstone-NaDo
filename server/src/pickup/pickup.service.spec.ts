import { Test, TestingModule } from '@nestjs/testing';
import { PickupService } from './pickup.service';

describe('PickupService', () => {
  let service: PickupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PickupService],
    }).compile();

    service = module.get<PickupService>(PickupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

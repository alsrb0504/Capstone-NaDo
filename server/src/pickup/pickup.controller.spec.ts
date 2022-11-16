import { Test, TestingModule } from '@nestjs/testing';
import { PickupController } from './pickup.controller';

describe('PickupController', () => {
  let controller: PickupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PickupController],
    }).compile();

    controller = module.get<PickupController>(PickupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

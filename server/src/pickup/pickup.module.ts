import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Orders from 'src/entity/orders/orders.entity';
import Pickedorder from 'src/entity/pickedorder/pickedorder.entity';
import { PickupController } from './pickup.controller';
import { PickupService } from './pickup.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Pickedorder, Orders])
  ],
  controllers: [PickupController],
  providers: [PickupService]
})
export class PickupModule {}

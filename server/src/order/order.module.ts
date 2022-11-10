import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Menu from 'src/entity/menu/menu.entity';
import Orderdetails from 'src/entity/orderdetails/orderdetails.entity';
import Orders from 'src/entity/orders/orders.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, Menu, Orderdetails])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}

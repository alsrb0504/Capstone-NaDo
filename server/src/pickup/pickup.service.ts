import { ForbiddenException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Orders from 'src/entity/orders/orders.entity';
import Pickedorder from 'src/entity/pickedorder/pickedorder.entity';
import { OrderDetail } from 'src/type/order/order.type';
import { getCurrentTime } from 'src/util/util';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PickupService {
  constructor(
    @InjectRepository(Pickedorder) private pickupRepository: Repository<Pickedorder>,
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    private dataSource: DataSource
  ){}

  async pickup(
    orderSequence: string,
    userSequence: string
  ) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    await queryRunner.startTransaction();
    try {
      const pickupInfo = await this.pickupRepository
        .createQueryBuilder('pickedorder')
        .select('pickedorder.sequence')
        .leftJoinAndSelect('pickedorder.order', 'orders')
        .where('pickedorder.picker = :pickerSequence', {pickerSequence: userSequence})
        .andWhere('orders.orderStatus = :status', {status: 'ordered'})
        .getMany()
      
      // throw new Error("afsd")
      if(pickupInfo.length) {
        throw new ForbiddenException("you already picked order")
      }

      const orderInfo = await this.ordersRepository
        .createQueryBuilder('orders')
        .select('orders.orderTimeout')
        .where('orders.sequence = :orderSequence', {orderSequence})
        .getOne()

      const timeout = new Date(orderInfo.orderTimeout)
      const currTime = getCurrentTime()
      currTime.setMinutes(currTime.getMinutes() + 20)

      if(timeout.getTime() < currTime.getTime()) {
        throw new ForbiddenException("this can not pickup because pickup timeout before 20 minutes")
      }
      await this.pickupRepository
        .createQueryBuilder('pickedorder')
        .insert()
        .into(Pickedorder)
        .values([{
          picker: () => userSequence,
          order: () => orderSequence
        }])
        .execute()

      await this.ordersRepository
        .createQueryBuilder('orders')
        .update(Orders)
        .set({
          orderStatus: 'pickuped'
        })
        .where('orders.sequence = :orderSequence', {orderSequence})
        .execute()

      await queryRunner.commitTransaction()
      return 'success'
    } catch (err) {
        await queryRunner.rollbackTransaction()
        throw new HttpException(err.message, err?.status | 500)              
    }
  }

  async pickupDetail(
    pickupSequence: string
  ): Promise<OrderDetail>{
    try {
      const pickupInfo = await this.pickupRepository
        .createQueryBuilder('pickedorder')
        .select('*')
        .where('pickedorder.sequence = :pickupSequence', {pickupSequence: parseInt(pickupSequence)})
        .getRawMany()

      
      if(!pickupInfo.length) {
        throw new ForbiddenException("not exist pickup information ")
      }
      
        const orderList = await this.ordersRepository
        .createQueryBuilder('orders')
        .select('orders.sequence')
        .addSelect('orders.orderTimeout')
        .addSelect('orders.amountOfPayment')
        .addSelect('orders.deliveryFee')
        .addSelect('orders.menuPrice')
        .addSelect('orders.orderStatus')
        .addSelect('orders.address')
        .addSelect('orders.addressDetail')
        .addSelect('orders.message')
        .addSelect('orderdetails.sequence')
        .addSelect('orderdetails.productQuantity')
        .addSelect('orderdetails.iceOrHot')
        .addSelect('orderdetails.shots')
        .addSelect('orderdetails.menuPrice')
        .addSelect('menus.sequence')
        .addSelect('menus.menuName')
        .addSelect('menus.menuPrice')
        .addSelect('store.sequence')
        .addSelect('store.lat')
        .addSelect('store.long')
        .where('orders.sequence = :sequence', { sequence: pickupInfo[0].orderSequence})
        .leftJoin('orders.store', 'store')
        .leftJoin('orders.orderProducts', 'orderdetails')
        .leftJoin('orderdetails.menu', 'menus')
        .getOne();

      const menuDetails = [];
      const { sequence, store, orderProducts, deliveryFee, amountOfPayment, menuPrice } = orderList;

      console.log(orderList);

      for (let [index, menuDetail] of orderProducts.entries()) {
        menuDetails.push({
          ...menuDetail,
          orderdetailsSequence: menuDetail.sequence,
        });

        delete menuDetails[index].sequence;
      }

      const result = {
        orderSequence: sequence,
        ...orderList,
        store: {
          ...store,
          storeSequence: store.sequence,
        },
        priceInfo: {
          deliveryFee,
          menuPrice,
          amountOfPayment,
        },
        orderProducts: menuDetails,
      };

      delete result.sequence;
      delete result.store.sequence;
      delete result.menuPrice;
      delete result.deliveryFee;
      delete result.amountOfPayment;

      return result;
    } catch (err){
      throw new HttpException(err.message, err?.status || 500)
    }
  }
}

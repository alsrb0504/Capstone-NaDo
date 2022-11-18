import { ForbiddenException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Orders from 'src/entity/orders/orders.entity';
import Pickedorder from 'src/entity/pickedorder/pickedorder.entity';
import { OrderDetail } from 'src/type/order/order.type';
import { PickupList_, Profit, ProfitList } from 'src/type/pickup/pickup.type';
import { PickupList } from 'src/type/store/store.type';
import { getCurrentTime } from 'src/util/util';
import { DataSource, QueryResult, Repository } from 'typeorm';

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
        .where('pickedorder.picker = :pickerSequence', {pickerSequence: parseInt(userSequence)})
        .andWhere('orders.orderStatus = :status', {status: 'pickuped'})
        .getMany()
      
      // throw new Error("afsd")
      if(pickupInfo.length) {
        throw new ForbiddenException("you already picked order")
      }

      const orderInfo = await this.ordersRepository
        .createQueryBuilder('orders')
        .select('orders.orderTimeout')
        .addSelect('user.sequence')
        .where('orders.sequence = :orderSequence', {orderSequence: parseInt(orderSequence)})
        .leftJoin('orders.user', 'user')
        .getOne()
      console.log(orderSequence)
      console.log(orderInfo)

      const timeout = new Date(orderInfo.orderTimeout)
      const currTime = getCurrentTime()
      currTime.setMinutes(currTime.getMinutes() + 20)

      if(timeout.getTime() < currTime.getTime()) {
        throw new ForbiddenException("this can not pickup because pickup timeout before 20 minutes")
      }

      if(orderInfo.user.sequence === parseInt(userSequence)){
        throw new ForbiddenException("this ordered by yours")
      }

      await this.pickupRepository
        .createQueryBuilder('pickedorder')
        .insert()
        .into(Pickedorder)
        .values([{
          picker: () => userSequence,
          order: () => orderSequence,
          pickupedAt: getCurrentTime()
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
        pickupSequence,
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

  async pickupList(
    pickerSequence: number
  ): Promise<Array<PickupList_>>{
    try {
      const pickupLists = await this.pickupRepository
        .createQueryBuilder('pickedorder')
        .select('orders.address')
        .select('orders.sequence')
        .addSelect('orders.addressDetail')
        .addSelect('orders.orderTimeout')
        .addSelect('orders.menuPrice')
        .addSelect('pickedorder.sequence')
        .leftJoin('pickedorder.order', 'orders')
        .where('pickedorder.picker = :pickerSequence', {pickerSequence})
        .andWhere('orders.orderStatus = :status', {status: 'pickuped'})
        .getMany()

      console.log(pickupLists)

      const result = []

      for(let pickupList of pickupLists) {
        const {sequence, order} = pickupList 
        const {address, addressDetail, menuPrice, orderTimeout} = order

        result.push({
          location: {
            address,
            detail: addressDetail
          },
          timeout: orderTimeout,
          totalPrice: menuPrice,
          pickupSequence: sequence,
          orderSequence: order.sequence
        })
      }

      return result
    } catch (err) {
      throw new HttpException(err.message, err?.status || 500)
    }
  }

  async deletePickup(
    pickupSequence: string
  ) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    await queryRunner.startTransaction();
    try {
      const pickupInfo = await this.pickupRepository
        .createQueryBuilder('pickedorder')
        .select('pickedorder.pickupedAt')
        .addSelect('orders.sequence')
        .leftJoin('pickedorder.order', 'orders')
        .where('pickedorder.sequence = :pickupSequence',  {pickupSequence})
        .getOne()
      
      if(!pickupInfo) {
          throw new ForbiddenException("pickup information is not exist")
      }

        const timeout = new Date(pickupInfo.pickupedAt)
        const currTime = getCurrentTime()
        timeout.setMinutes(timeout.getMinutes() + 5)
  
        if(timeout.getTime() < currTime.getTime()) {
          throw new ForbiddenException("you can't cancel pickup because it's been 5 minutes since pick up")
        }
      
      await this.pickupRepository
        .createQueryBuilder('pickedorder')
        .delete()
        .from(Pickedorder)
        .where('pickedorder.sequence = :pickupSequence', {pickupSequence})
        .execute()

      await this.ordersRepository
        .createQueryBuilder('orders')
        .update(Orders)
        .set({
          orderStatus: 'ordered'
        })
        .execute()
      await queryRunner.commitTransaction()

      return 'success'
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw new HttpException(err.message, err?.status || 500)
    }
  }

  async completePickup(
    pickupSequence: string
  ) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    await queryRunner.startTransaction();
    
    try {
      const pickupInfo = await this.pickupRepository
        .createQueryBuilder('pickedorder')
        .select('pickedorder.sequence')
        .addSelect('orders.sequence')
        .leftJoin('pickedorder.order', 'orders')
        .where('pickedorder.sequence = :pickupSequence', {pickupSequence})
        .andWhere('orders.orderStatus = :status', {status: 'pickuped'})
        .getOne()
      
      if(!pickupInfo) {
          throw new ForbiddenException("pickup information is not exist")
      }

      await this.ordersRepository
        .createQueryBuilder('orders')
        .update(Orders)
        .set({
          orderStatus: 'delivered',
        })
        .where('orders.sequence = :orderSequence', {orderSequence: pickupInfo.order.sequence})
        .execute()
      
      await this.pickupRepository
        .createQueryBuilder('pickedorder')
        .update(Pickedorder)
        .set({
          completedAt: getCurrentTime()
        })
        .where('pickedorder.sequence = :pickupSequence', {pickupSequence})
        .execute()
      
      await queryRunner.commitTransaction()
      return 'success'

    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw new HttpException(err.message, err?.status || 500)
    }
  }

  async profit(
    startTime: string,
    endTime: string,
    pickerSequence: number
  ): Promise<ProfitList> {
    try {
      const startTime_ = new Date(startTime)
      const endTime_ = new Date(endTime)
  
      const orderInfoWithDelivered: Profit[] = await this.pickupRepository
       .createQueryBuilder('pickedorder')
       .select('orders.sequence AS orderSequence')
       .addSelect('orders.address AS address')
       .addSelect('orders.addressDetail AS addressDetail')
       .addSelect('orders.deliveryFee AS deliveryFee')
       .addSelect('pickedorder.completedAt AS deliveredAt')
       .leftJoin('pickedorder.order', 'orders')
       .leftJoin('pickedorder.picker', 'user')
       .where('orders.orderStatus = :status', {status: 'delivered'})
       .andWhere('user.sequence = :pickerSequence', {pickerSequence})
       .andWhere('pickedorder.completedAt > :startTime', {startTime: startTime_})
       .andWhere('pickedorder.completedAt < :endTime', {endTime: endTime_})
       .getRawMany()
      
      
      endTime_.setDate(endTime_.getDate() + 1)
  
      const orderInfoWithAccepted: Profit[] = await this.pickupRepository
       .createQueryBuilder('pickedorder')
       .select('orders.sequence AS orderSequence')
       .addSelect('orders.address AS address')
       .addSelect('orders.addressDetail AS addressDetail')
       .addSelect('orders.deliveryFee AS deliveryFee')
       .addSelect('pickedorder.completedAt AS deliveredAt')
       .leftJoin('pickedorder.order', 'orders')
       .leftJoin('pickedorder.picker', 'user')
       .where('orders.orderStatus = :status', {status: 'accepted'})
       .andWhere('user.sequence = :pickerSequence', {pickerSequence})
       .andWhere('pickedorder.completedAt > :startTime', {startTime: startTime_})
       .andWhere('pickedorder.completedAt < :endTime', {endTime: endTime_})
       .getRawMany() 

       const profitList: Profit[] = [...orderInfoWithDelivered, ...orderInfoWithAccepted]

       let totalProfit = 0

       profitList.forEach((list) => {
        totalProfit += list.deliveryFee
       })

       return {
        profitList,
        totalProfit
       }

    } catch (err) {
      throw new HttpException(err.message, err?.status || 500)
    }
  }
}

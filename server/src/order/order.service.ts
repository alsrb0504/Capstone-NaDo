import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Menu from 'src/entity/menu/menu.entity';
import Orderdetails from 'src/entity/orderdetails/orderdetails.entity';
import Orders from 'src/entity/orders/orders.entity';
import Pickedorder from 'src/entity/pickedorder/pickedorder.entity';
import { OrderDetail, OrderPay, SettleOrder, WaitOrder } from 'src/type/order/order.type';
import { addHours } from 'src/util/util';
import { Brackets, DataSource, InsertResult, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    @InjectRepository(Pickedorder) private pickupRepository: Repository<Pickedorder>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    @InjectRepository(Orderdetails)
    private orderdetailRepository: Repository<Orderdetails>,
    private dataSource: DataSource,
  ) {}

  async orderPay(
    orderInfo: OrderPay,
    sequence: number
  ) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    await queryRunner.startTransaction();

    const { orderAddress, orderRequest, orderPrice, orderMenu, storeId } =
      orderInfo;

    

    if (new Date(orderRequest.time).toString() === 'Invalid Date') {
      throw new BadRequestException(
        " orderRequest.time ==>> 시간 형식의 문자열이 아닙니다. ==> '2022/03/23 15:32' 이러한 형식으로 보내야합니다.",
      );
    }

    const orderDate = new Date(orderRequest.time);
    const orderTimeout = addHours(1, orderDate);

    console.log(orderInfo);

    try {
      const insertedData: InsertResult = await this.ordersRepository
        .createQueryBuilder('orders')
        .insert()
        .into(Orders)
        .values([
          {
            orderDate,
            orderTimeout,
            address: orderAddress.address,
            addressDetail: orderAddress.detail,
            message: orderRequest.detail,
            deliveryFee: orderPrice.deliveryFee,
            menuPrice: orderPrice.menuPrice,
            amountOfPayment: orderPrice.totalPrice,
            orderStatus: 'ordered',
            user: () => sequence.toString(),
            store: () => storeId.toString()
          }
        ])
        .execute();

      const menus = [];


      for (let menu of orderMenu) {

        const { menuId, menuOptions, menuPrice } = menu;

        const { icehot, cnt, shots } = menuOptions;

        menus.push({
          shots,
          menuPrice,
          order: insertedData.raw.insertId,
          menu: menuId,
          iceOrHot: icehot,
          productQuantity: cnt,
        });
      }

      await this.orderdetailRepository
        .createQueryBuilder('orderdetails')
        .insert()
        .into(Orderdetails)
        .values(menus)
        .execute();

      await queryRunner.commitTransaction();

      return 'success';
    } catch (err) {
      await queryRunner.rollbackTransaction();
      switch (err.status) {
        case 400:
          throw new BadRequestException(err.message);
        default:
          throw new InternalServerErrorException(err.message);
      }
    }
  }

  async getOrderByUser(userSequence: number | string): Promise<WaitOrder[]> {
    try {
      const allOrderLists = await this.ordersRepository
        .createQueryBuilder('orders')
        .where('orders.userSequence = :sequence', { sequence: userSequence })
        .andWhere(new Brackets((qb) => {
          qb
            .where('orders.orderStatus = :status', { status: 'ordered' })
            .orWhere('orders.orderStatus = :status1', { status1: 'pickuped' })
            .orWhere('orders.orderStatus = :status2', { status2: 'delivered' })
        }))
        .getMany();

      const orderLists = [];
      for (let order of allOrderLists) {
        const {
          sequence,
          orderTimeout,
          amountOfPayment,
          address,
          addressDetail,
        } = order;
        orderLists.push({
          orderTimeout: orderTimeout,
          totalPrice: amountOfPayment,
          orderSequence: sequence,
          orderAddress: {
            address,
            detail: addressDetail,
          },
        });
      }

      return orderLists;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async getOrderDetail(orderSequence: string | number): Promise<OrderDetail> {
    try {
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
        .where('orders.sequence = :sequence', { sequence: orderSequence })
        .leftJoin('orders.store', 'store')
        .leftJoin('orders.orderProducts', 'orderdetails')
        .leftJoin('orderdetails.menu', 'menus')
        .getOne();

      const menuDetails = [];
      const { sequence, store, orderProducts, deliveryFee, amountOfPayment, menuPrice } = orderList;


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
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async completeOrder(
    orderSequence: number
  ) {
    try {
      const orderInfo = await this.ordersRepository
        .createQueryBuilder('orders')
        .select('orders.sequence')
        .where('orders.sequence = :orderSequence', {orderSequence})
        .andWhere('orders.orderStatus = :status', {status: 'delivered'})
        .getOne()

      if(!orderInfo) {
        throw new ForbiddenException('order information is not exists or orderStatus is not delivered')
      }

      await this.ordersRepository
        .createQueryBuilder('orders')
        .update(Orders)
        .set({
          orderStatus: 'accepted'
        })
        .where('orders.sequence = :orderSequence', {orderSequence})
        .execute()

      return 'success'
    } catch (err) {
      throw new HttpException(err.message, err?.status || 500)
    }
  }

  async settleOrder(
    startTime: string,
    endTime: string,
    userSequence: number
  ): Promise<Array<SettleOrder>>{

    try {
      const startTime_ = new Date(startTime)
      const endTime_ = new Date(endTime)
  
      const orderInfoWithDelivered = await this.pickupRepository
       .createQueryBuilder('pickedorder')
       .select('orders.sequence AS orderSequence')
       .addSelect('orders.address AS address')
       .addSelect('orders.addressDetail AS addressDetail')
       .addSelect('orders.menuPrice AS totalPrice')
       .addSelect('pickedorder.completedAt AS deliveredAt')
       .leftJoin('pickedorder.order', 'orders')
       .leftJoin('orders.user', 'user')
       .where('orders.orderStatus = :status', {status: 'delivered'})
       .andWhere('user.sequence = :userSequence', {userSequence})
       .andWhere('pickedorder.completedAt > :startTime', {startTime: startTime_})
       .andWhere('pickedorder.completedAt < :endTime', {endTime: endTime_})
       .getRawMany()
      
      
      endTime_.setDate(endTime_.getDate() + 1)
  
      const orderInfoWithAccepted = await this.pickupRepository
       .createQueryBuilder('pickedorder')
       .select('orders.sequence AS orderSequence')
       .addSelect('orders.address AS address')
       .addSelect('orders.addressDetail AS addressDetail')
       .addSelect('orders.menuPrice AS totalPrice')
       .addSelect('pickedorder.completedAt AS deliveredAt')
       .leftJoin('pickedorder.order', 'orders')
       .leftJoin('orders.user', 'user')
       .where('orders.orderStatus = :status', {status: 'accepted'})
       .andWhere('user.sequence = :userSequence', {userSequence})
       .andWhere('pickedorder.completedAt > :startTime', {startTime: startTime_})
       .andWhere('pickedorder.completedAt < :endTime', {endTime: endTime_})
       .getRawMany()

       return [...orderInfoWithDelivered, ...orderInfoWithAccepted]
    } catch (err) {
      throw new HttpException(err.message, err?.status || 500)
    }

  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Menu from 'src/entity/menu/menu.entity';
import Orderdetails from 'src/entity/orderdetails/orderdetails.entity';
import Orders from 'src/entity/orders/orders.entity';
import Store from 'src/entity/store/store.entity';
import User from 'src/entity/user/user.entity';
import { OrderDetail, OrderPay, WaitOrder } from 'src/type/order/order.type';
import { addHours } from 'src/util/util';
import { DataSource, InsertResult, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
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

      console.log(`orderMenu : ${orderMenu}`);

      for (let menu of orderMenu) {
        console.log(`menu : ${menu}`);

        const { menuId, menuOptions, menuPrice } = menu;
        console.log(`menuOptions : ${menuOptions}`);

        console.log(`menuId : ${menuId}`);
        console.log(`menuPrice : ${menuPrice}`);

        const { icehot, cnt, shots } = menuOptions;

        console.log(`icehot : ${icehot}`);

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
      console.log(err.message);
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
        .andWhere('orders.orderStatus = :status', { status: 'ordered' })
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

  async getOrderDetail(orderSequence: string | number): Promise<any> {
    try {
      const orderList = await this.ordersRepository
        .createQueryBuilder('orders')
        .select('orders.sequence')
        .addSelect('orders.orderTimeout')
        .addSelect('orders.amountOfPayment')
        .addSelect('orders.deliveryFee')
        .addSelect('orders.menuPrice')
        .addSelect('orders.orderStatus')
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
      const { sequence, store, orderProducts } = orderList;

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
        orderProducts: menuDetails,
      };

      delete result.sequence;
      delete result.store.sequence;

      return result;
    } catch (err) {
      console.log(err.response);
      throw new InternalServerErrorException(err.message);
    }
  }
}

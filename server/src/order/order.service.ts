import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Menu from 'src/entity/menu/menu.entity';
import Orderdetails from 'src/entity/orderdetails/orderdetails.entity';
import Orders from 'src/entity/orders/orders.entity';
import Store from 'src/entity/store/store.entity';
import User from 'src/entity/user/user.entity';
import { OrderPay } from 'src/type/order/order.type';
import { addHours } from 'src/util/util';
import { DataSource, InsertResult, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    @InjectRepository(Orderdetails) private orderdetailRepository: Repository<Orderdetails>,
    private dataSource: DataSource
  ) {}

  async orderPay(
    orderInfo: OrderPay,
    user: User
  ) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    await queryRunner.startTransaction()

    const {orderAddress, orderRequest, orderPrice, orderMenu, storeId} = orderInfo

    if((new Date(orderRequest.time)).toString() === 'Invalid Date') {
      throw new BadRequestException(" orderRequest.time ==>> 시간 형식의 문자열이 아닙니다. ==> '2022/03/23 15:32' 이러한 형식으로 보내야합니다.")
    }

    const orderDate = new Date(orderRequest.time)
    const orderTimeout = addHours(1, orderDate)

    console.log(orderInfo)

    try {
      const insertedData:InsertResult = await this.ordersRepository
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
            user: () => user?.sequence.toString(),
            store: () => storeId.toString()
          }
        ])
        .execute()
      
      const menus = []

      for(let menu of orderMenu) {
        const {menuId, menuOptions, menuPrice} = menu
        const {icehot, cnt, shots} = menuOptions

        menus.push({
          shots,
          menuPrice,
          order: insertedData.raw.insertId,
          menu: menuId,
          iceOrHot: icehot,
          productQuantity: cnt,
        })
      }
        
      await this.orderdetailRepository
        .createQueryBuilder('orderdetails')
        .insert()
        .into(Orderdetails)
        .values(menus)
        .execute()
      
     await queryRunner.commitTransaction() 

     return 'success'
    } catch (err) {
      await queryRunner.rollbackTransaction()
      console.log(err.message)
      switch(err.status) {
        case 400:
          throw new BadRequestException(err.message)
        default:
          throw new InternalServerErrorException(err.message)
      }
    }
  }
}

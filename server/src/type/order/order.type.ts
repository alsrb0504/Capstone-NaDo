import { ApiProperty, PickType } from "@nestjs/swagger";
import Menu from "src/entity/menu/menu.entity";
import Orderdetails from "src/entity/orderdetails/orderdetails.entity";
import Orders from "src/entity/orders/orders.entity";
import { StoreLocation } from "../store/store.type";


export class OrderAddress {
  @ApiProperty({
    type: String
  })
  address: string

  @ApiProperty({
    type: String
  })
  detail: string
}

export class OrderRequest {
  @ApiProperty({
    type: String
  })
  time: string

  @ApiProperty({
    type: String
  })
  detail: string
}

export class OrderPrice {
  @ApiProperty({
    type: Number
  })
  menuPrice: number

  @ApiProperty({
    type: Number
  })
  deliveryFee: number

  @ApiProperty({
    type: Number 
  })
  totalPrice: number
}


export class MenuOptions {
  @ApiProperty({
    type: String
  })
  icehot: string
  
  @ApiProperty({
    type: Number
  })
  cnt: number
  
  @ApiProperty({
    type: Number
  })
  shots: number
}

export class OrderMenu {
  @ApiProperty({
    type: Number
  })
  menuId: number

  @ApiProperty({
    type: MenuOptions
  })
  menuOptions: MenuOptions

  @ApiProperty({
    type: Number
  })
  menuPrice: number
}


export class OrderPay {
  @ApiProperty({
    type: OrderAddress
  })
  orderAddress: OrderAddress

  @ApiProperty({
    type: OrderRequest
  })
  orderRequest: OrderRequest

  @ApiProperty({
    type: OrderPrice
  })
  orderPrice: OrderPrice

  @ApiProperty({
    isArray: true,
    type: OrderMenu
  })
  orderMenu: OrderMenu[]

  @ApiProperty({
   type: Number
  })
  storeId: number

}

export class WaitOrder extends PickType(OrderPay, ['orderAddress']) {
  @ApiProperty({
    type: String,
    example: '19 : 20'
  })
  orderTimeout: string

  @ApiProperty({
    type: Number
  })
  totalPrice: number

  @ApiProperty({
    type: String
  })
  orderSequence: string
}

export class OrderDetailMenus extends PickType(Menu, ['menuName', 'menuPrice']) {
  @ApiProperty({
    type: Number
  })
  menuId: number
}

export class OrderdetailProducts extends PickType(Orderdetails, ['productQuantity', 'iceOrHot', 'shots']) {
  @ApiProperty({
    type: Number
  })
  orderdetailsSequence: number
}

export class StoreLocationWithSequence extends StoreLocation {
  @ApiProperty({
    type: String
  }) 
  storeSequence: string
}

export class OrderDetail extends PickType(Orders, ['orderTimeout', 'orderStatus', 'deliveryFee', 'menuPrice', 'amountOfPayment']){

  @ApiProperty({
    type: Number
  })
  orderSequence: number

  @ApiProperty({
    type: StoreLocationWithSequence
  })
  store: StoreLocationWithSequence

}


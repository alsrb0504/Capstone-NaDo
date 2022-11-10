import { ApiProperty, PickType } from "@nestjs/swagger";
import Orders from "src/entity/orders/orders.entity";


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


import { ApiProperty, OmitType } from "@nestjs/swagger";
import { OrderAddress, OrderDetail, SettleOrder } from "../order/order.type";

export class Pickup {
  @ApiProperty({
    type: String
  })
  orderSequence: string
}

export class PickupSequence {
  @ApiProperty({
    type: String
  })
  pickupSequence: string
}



export class PickupList_ {
  @ApiProperty({
    type: Date
  })
  timeout: Date

  @ApiProperty({
    type: Number
  })
  totalPrice: number

  @ApiProperty({
    type: Number
  })
  pickupSequence: number
  
  @ApiProperty({
    type: Number
  })
  orderSequence: number

  @ApiProperty({
    type: OrderAddress
  })
  location: OrderAddress
}

export class Profit extends OmitType(SettleOrder, ['totalPrice']) {
  @ApiProperty({
    type: Number
  })
  deliveryFee: number
}

export class ProfitList {
  @ApiProperty({
    type: Profit,
    isArray: true
  })
  profitList: Profit[]

  @ApiProperty({
    type: Number
  })
  totalProfit: number
}

export class PickupDetail extends OrderDetail {
  @ApiProperty({
    type: String
  })
  pickupSequence
}
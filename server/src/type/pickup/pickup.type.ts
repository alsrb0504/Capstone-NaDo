import { ApiProperty } from "@nestjs/swagger";
import { OrderAddress } from "../order/order.type";

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
    type: OrderAddress
  })
  location: OrderAddress
}
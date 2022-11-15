import { ApiProperty } from "@nestjs/swagger";
import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import Menu from "../menu/menu.entity";
import Order from "../orders/orders.entity";

@Entity({
  name: 'orderdetails'
})
export default class Orderdetails {
  @ApiProperty({
    type: Number
  })
  @PrimaryGeneratedColumn()
  sequence: number

  @ManyToOne(() => Order, order => order.orderProducts)
  order: Order

  @ApiProperty({
    type: Number
  })
  @ManyToOne(() => Menu, menu => menu.orderDetails)
  menu: number 

  @ApiProperty({
    type: Number
  })
  @Column({
    type: 'tinyint'
  })
  productQuantity: number

  @ApiProperty({
    type: Number
  })
  @Column({
    type: 'mediumint'
  })
  menuPrice: number

  @ApiProperty({
    type: String
  })
  @Column({
    type: 'varchar'
  })
  iceOrHot: string

  @ApiProperty({
    type: Number
  })
  @Column({
    type: 'tinyint'
  })
  shots: number
}
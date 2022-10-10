import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import Order from "./orders.entity";

@Entity({
  name: 'orderdetails'
})
export default class Orderdetails {
  @PrimaryGeneratedColumn()
  sequence: number

  @ManyToOne(() => Order, order => order.orderProducts)
  order: Order

  @Column({
    type: 'varchar',
    length: 50
  })
  productName: string

  @Column({
    type: 'mediumint'
  })
  productPriceEach: number

  @Column({
    type: 'tinyint'
  })
  productQuantity: number
}
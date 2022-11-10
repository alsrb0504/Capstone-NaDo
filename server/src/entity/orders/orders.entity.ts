import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToOne, OneToMany} from "typeorm";
import Orderdetails from "../orderdetails/orderdetails.entity";
import Pickedorder from "../pickedorder/pickedorder.entity";
import Store from "../store/store.entity";
import User from "../user/user.entity";

@Entity({
  name: 'orders'
})
export default class Orders {

  @ApiProperty({
    type: Number
  })
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  sequence: number

  @ApiProperty({
    type: String
  })
  @Column({
    type: 'varchar'
  })
  address: string

  @ApiProperty({
    type: String
  })
  @Column({
    type: 'varchar'
  })
  addressDetail: string

  @ApiProperty({
    type: String 
  })
  @Column({
    type: 'tinytext'
  })
  message: string

  @ApiProperty({
    type: Date 
  })
  @Column({
    type: 'timestamp',
  })
  orderDate: Date

  @ApiProperty({
    type: Date 
  })
  @Column({
    type: 'timestamp'
  })
  orderTimeout: Date

  @ApiProperty({
    type: String 
  })
  @Column({
    type: 'varchar'
  })
  orderStatus: string

  @ApiProperty({
    type: Date 
  })
  @Column({
    type: 'timestamp',
    nullable: true
  })
  orderCompleteDate: Date

  @ApiProperty({
    type: Number
  })
  @Column({
    type: 'mediumint'
  })
  deliveryFee: number

  @ApiProperty({
    type: Number
  })
  @Column({
    type: 'mediumint'
  })
  menuPrice: number

  @ApiProperty({
    type: Number 
  })
  @Column({
    type: 'mediumint'
  })
  amountOfPayment: number

  @ApiProperty({
    type: Number 
  })
  @OneToMany(() => Orderdetails, orderdetails => orderdetails.order)
  orderProducts: Orderdetails[]

  @ManyToOne(() => User, user => user.orders)
  user: User

  @ManyToOne(() => Store, store => store.orders)
  store: Store
}
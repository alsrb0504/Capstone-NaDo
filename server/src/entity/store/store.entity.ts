import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, UsingJoinColumnIsNotAllowedError} from "typeorm";
import Menu from "../menu/menu.entity";
import Order from "../orders/orders.entity";
import Storebusinesstime from "../storebusinesstime/storebusinesstime.entity";


@Entity({
  name: 'store'
})
export default class Store {

  @ApiProperty({
    type: Number,
    description: 'store number for identification'
  })
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  sequence: number

  @ApiProperty({
    type: String,
    description: 'store name'
  })
  @Column({
    type: 'varchar',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci'
  })
  name: string

  @ApiProperty({
    type: String,
    description: 'store address'
  })
  @Column({
    type: 'varchar',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci'
  })
  address: string

  @ApiProperty({
    type: String,
    description: 'store telephone telephone number'
  })
  @Column({
    type: 'varchar',
  })
  telephone: string

  @ApiProperty({
    type: String,
    description: 'store image path'
  })
  @Column({
    type: 'tinytext',
    nullable: true
  })
  image: string

  @ApiProperty({
    type: Array<Order>,
    description: 'store order\'s'
  })
  @OneToMany(() => Order, order => order.store)
  orders: Order[]

  @ApiProperty({
    type: Array<Menu>,
    description: 'store menu\'s'
  })
  @OneToMany(() => Menu, menu => menu.store)
  menus: Menu[]

  @ApiProperty({
    type: Array<Storebusinesstime>,
    description: 'store businessTime\'s'
  })
  @OneToMany(() => Storebusinesstime, storebusinesstime => storebusinesstime.store)
  businesstimes: Storebusinesstime[]
}
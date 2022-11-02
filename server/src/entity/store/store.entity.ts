import { PrimaryGeneratedColumn, Column, Entity, OneToMany, UsingJoinColumnIsNotAllowedError} from "typeorm";
import Menu from "../menu/menu.entity";
import Order from "../orders/orders.entity";
import Storebusinesstime from "../storebusinesstime/storebusinesstime.entity";


@Entity({
  name: 'store'
})
export default class Store {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  sequence: number

  @Column({
    type: 'varchar',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci'
  })
  name: string

  @Column({
    type: 'varchar',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci'
  })
  address: string

  @Column({
    type: 'varchar',
  })
  telephone: string

  @Column({
    type: 'tinytext',
    nullable: true
  })
  image: string

  @OneToMany(() => Order, order => order.store)
  orders: Order[]

  @OneToMany(() => Menu, menu => menu.store)
  menus: Menu[]

  @OneToMany(() => Storebusinesstime, storebusinesstime => storebusinesstime.store)
  businesstimes: Storebusinesstime[]
}
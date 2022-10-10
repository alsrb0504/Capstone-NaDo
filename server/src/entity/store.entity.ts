import { PrimaryGeneratedColumn, Column, Entity, OneToMany} from "typeorm";
import Menu from "./menu.entity";
import Order from "./orders.entity";
import Storebusinesstime from "./storebusinesstime.entity";


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
  })
  name: string

  @Column({
    type: 'text',
  })
  introduce: string

  @Column({
    type: 'varchar'
  })
  address: string

  @Column({
    type: 'varchar',
  })
  telephone: string

  @OneToMany(() => Order, order => order.store)
  orders: Order[]

  @OneToMany(() => Menu, menu => menu.store)
  menus: Menu[]

  @OneToMany(() => Storebusinesstime, storebusinesstime => storebusinesstime.store)
  businesstimes: Storebusinesstime[]
}
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToOne, OneToMany} from "typeorm";
import Orderdetails from "./orderdetails.entity";
import Pickedorder from "./pickedorder.entity";
import Store from "./store.entity";
import User from "./user.entity";

@Entity({
  name: 'orders'
})
export default class Orders {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  sequence: number

  @Column({
    type: 'char'
  })
  address: string

  @Column({
    type: 'timestamp',
  })
  orderDate: Date

  @Column({
    type: 'timestamp'
  })
  orderTimeout: Date

  @Column({
    type: 'boolean'
  })
  isOrderCompleted: boolean

  @Column({
    type: 'timestamp',
    nullable: true
  })
  orderCompleteDate: Date

  @Column({
    type: 'mediumint'
  })
  amountOfPayment: number



  @OneToMany(() => Orderdetails, orderdetails => orderdetails.order)
  orderProducts: Orderdetails[]

  @ManyToOne(() => User, user => user.orders)
  user: User

  @ManyToOne(() => Store, store => store.orders)
  store: Store
}
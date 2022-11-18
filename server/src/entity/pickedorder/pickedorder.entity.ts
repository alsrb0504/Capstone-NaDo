import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Orders from "../orders/orders.entity";
import User from "../user/user.entity";

@Entity({
  name: 'pickedorder'
})
export default class Pickedorder{
  @PrimaryGeneratedColumn()
  sequence: number

  @ManyToOne(() => User, user => user.pickups)
  picker: User

  @OneToOne(() => Orders)
  @JoinColumn()
  order: Orders

  @Column({
    type: 'timestamp',
    nullable: true
  })
  pickupedAt: Date

  @Column({
    type: 'timestamp',
    nullable: true
  })
  completedAt: Date
}

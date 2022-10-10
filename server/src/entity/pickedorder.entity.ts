import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Orders from "./orders.entity";
import User from "./user.entity";

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
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Store from "../store/store.entity";


@Entity({
  name: 'storebusinesstime'
})
export default class Storebusinesstime {
  @PrimaryGeneratedColumn()
  sequence: number

  @ManyToOne(() => Store, store => store.businesstimes)
  store: Store
}
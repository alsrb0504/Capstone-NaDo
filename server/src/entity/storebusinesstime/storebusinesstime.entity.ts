import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Store from "../store/store.entity";


@Entity({
  name: 'storebusinesstime'
})
export default class Storebusinesstime {
  @PrimaryGeneratedColumn()
  sequence: number

  @Column({
    type: 'varchar',
    length: 10
  })
  dayOfWeek: string

  @Column({
    type: 'varchar',
    nullable: true
  })
  startTime: string

  @Column({
    type: 'varchar',
    nullable: true
  })
  endTime: string

  @ManyToOne(() => Store, store => store.businesstimes)
  store: Store

}
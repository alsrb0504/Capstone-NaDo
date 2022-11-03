import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Store from "../store/store.entity";


@Entity({
  name: 'storebusinesstime'
})
export default class Storebusinesstime {
  @PrimaryGeneratedColumn()
  sequence: number

  @ApiProperty({
    type: String,
    description: 'businesstime dayOfWeek'
  })
  @Column({
    type: 'varchar',
    length: 10
  })
  dayOfWeek: string

  @ApiProperty({
    type: String,
    description: 'businesstime start time'
  })
  @Column({
    type: 'varchar',
    nullable: true
  })
  startTime: string

  @ApiProperty({
    type: String,
    description: 'businesstime endtime'
  })
  @Column({
    type: 'varchar',
    nullable: true
  })
  endTime: string

  @ManyToOne(() => Store, store => store.businesstimes)
  store: Store

}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm'
import { IdentifierDescription, NicknameDescription, EmailDescription, ImagePathDescription, ProviderDescription } from './user.decorator'
import Orders from '../orders/orders.entity'
import Pickedorder from '../pickedorder/pickedorder.entity'


@Entity({
  name: 'user'
})
export default class User {
  @PrimaryGeneratedColumn()
  sequence: number

  @IdentifierDescription()
  @Column({
    type: 'varchar',
    length: 15,
    nullable: true
  })
  identifier: string | null

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true
  })
  password: string | null

  @NicknameDescription()
  @Column({
    type: 'varchar',
    length: 10,
  })
  nickname: string

  @EmailDescription()
  @Column({
    type: 'varchar',
    length: 45
  })
  email: string

  @ProviderDescription()
  @Column({
    type: 'varchar',
    length: 8
  })
  provider: string

  @ImagePathDescription()
  @Column({
    type: 'varchar',
    nullable: true
  })
  imagePath: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updatedAt: Date

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null
  })
  withdrawAt: Date | null

  @OneToMany(() => Orders, order => order.user)
  orders: Orders[]

  @OneToMany(() => Pickedorder, pickedorder => pickedorder.picker)
  pickups: Pickedorder[]

}
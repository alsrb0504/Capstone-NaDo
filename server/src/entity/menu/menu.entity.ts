import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import Menusize from "../menusize/menusize.entity";
import Store from "../store/store.entity";

@Entity({
  name: 'menu'
})
export default class Menu {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  sequence: number

  @ManyToOne(() => Store, store => store.menus)
  store: Store

  @Column({
    type: 'varchar',
    length: 30
  })
  menuName: string

  @Column({
    type: 'mediumint'
  })
  menuPrice: number

  @Column({
    type: 'boolean',
    default: false
  })
  isReported: boolean

  @OneToMany(() => Menusize, menusize => menusize.menu)
  menuSizes: Menusize[]
}

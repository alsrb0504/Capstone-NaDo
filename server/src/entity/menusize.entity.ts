import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Menu from "./menu.entity";

@Entity({
  name: 'menusize'
})
export default class Menusize {
  @PrimaryGeneratedColumn()
  sequence: number
  
  @ManyToOne(() => Menu, menu => menu.menuSizes)
  menu: Menu

  @Column({
    type: 'varchar',
    length: 10
  })
  menuSize: string
}
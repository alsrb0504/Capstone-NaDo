import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import Menusize from "../menusize/menusize.entity";
import Store from "../store/store.entity";

@Entity({
  name: 'menu'
})
export default class Menu {

  @ApiProperty({
    type: Number
  })
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  sequence: number

  @ManyToOne(() => Store, store => store.menus)
  store: Store


  @ApiProperty({
    type: String
  })
  @Column({
    type: 'varchar',
    length: 30,
  })
  menuName: string

  @ApiProperty({
    type: Number
  })
  @Column({
    type: 'mediumint',
    nullable: true,
  })
  menuPrice: number
  
  @ApiProperty({
    type: String
  })
  @Column({
    type: 'tinytext',
    nullable: true
  })
  menuImg: string

  @ApiProperty({
    type: Boolean
  })
  @Column({
    type: 'boolean',
    default: false
  })
  isReported: boolean

  
  @ApiProperty({
    type: String,
    isArray: true
  })
  @OneToMany(() => Menusize, menusize => menusize.menu)
  menuSizes: Menusize[]
}

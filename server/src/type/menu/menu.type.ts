import { PickType } from "@nestjs/swagger";
import Menu from "src/entity/menu/menu.entity";

export class StoreDetailMenu extends PickType(Menu, ['menuName', 'menuPrice', 'menuImg', 'sequence']) {}


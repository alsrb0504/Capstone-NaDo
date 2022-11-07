import { ApiProperty, PickType } from "@nestjs/swagger";
import Store from "src/entity/store/store.entity";
import Storebusinesstime from "src/entity/storebusinesstime/storebusinesstime.entity";
import { StoreDetailMenu } from "../menu/menu.type";

export class BusinessTime extends PickType(Storebusinesstime, ['dayOfWeek', 'startTime', 'endTime']) {}

export class StoreList extends PickType(Store, ['sequence', 'name', 'image']) {

  @ApiProperty({
    type: Storebusinesstime,
    isArray: true,
    description: 'all store businesstime'
  })
  businessTimes: Storebusinesstime[]
}

export class StoreDetail extends StoreList {
  @ApiProperty({
    type: Storebusinesstime,
    isArray: true,
    description: 'store businesstime'
  })
  businessTimes: Storebusinesstime[]

  @ApiProperty({
    type: StoreDetailMenu,
    isArray: true
  })
  menus: StoreDetailMenu[]
}

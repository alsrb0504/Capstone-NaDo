import { ApiProperty, PickType } from "@nestjs/swagger";
import Store from "src/entity/store/store.entity";
import Storebusinesstime from "src/entity/storebusinesstime/storebusinesstime.entity";
import { StoreDetailMenu } from "../menu/menu.type";

export class BusinessTime extends PickType(Storebusinesstime, ['dayOfWeek', 'startTime', 'endTime']) {}

export class StoreLocation extends PickType(Store, ['lat', 'long']) {}

export class StoreList extends Store {

  @ApiProperty({
    type: StoreLocation,
    description: 'store location'
  })
  locationLating: StoreLocation


  @ApiProperty({
    type: Storebusinesstime,
    isArray: true,
    description: 'all store businesstime'
  })
  businessTimes: Storebusinesstime[]
}

export class StoreDetail extends PickType(Store, ['name', 'telephone']){

  @ApiProperty({
    type: Number
  })
  storeSequence: Number

  @ApiProperty({
    type: String
  })
  storeImage: string
  
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

  @ApiProperty({
    type: StoreLocation
  })
  locationLating: StoreLocation

}

export class GetAllStore extends PickType(StoreList, ['name', 'image', 'sequence', 'businessTimes']) {}


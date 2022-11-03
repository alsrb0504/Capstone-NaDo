import { ApiProperty, PickType } from "@nestjs/swagger";
import Store from "src/entity/store/store.entity";
import Storebusinesstime from "src/entity/storebusinesstime/storebusinesstime.entity";

export class BusinessTime extends PickType(Storebusinesstime, ['dayOfWeek', 'startTime', 'endTime']) {}

export class StoreList extends PickType(Store, ['sequence', 'name', 'image']) {

  @ApiProperty({
    type: Storebusinesstime,
    isArray: true,
    description: 'all store businesstime'
  })
  businessTimes: Storebusinesstime[]
}
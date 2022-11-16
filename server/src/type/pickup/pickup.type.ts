import { ApiProperty } from "@nestjs/swagger";

export class Pickup {
  @ApiProperty({
    type: String
  })
  orderSequence: string
}
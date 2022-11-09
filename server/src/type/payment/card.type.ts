import { ApiProperty, PickType } from "@nestjs/swagger";
import { ITossBilling } from "toss-payments-server-api/lib/structures/ITossBilling";

export class CardType {
  @ApiProperty({
    type: String
  })
  cardNumber: string

  @ApiProperty({
    type: String
  })
  cardExpirationYear: string

  @ApiProperty({
    type: String
  })
  cardExpirationMonth: string

  @ApiProperty({
    type: String
  })
  cardPassword: string
}

export class CardRegisterType extends CardType {}

export interface RegisterCard {
  data: ITossBilling
  customerKey: string
}

export class CardInformation {

  @ApiProperty({
    type: String
  })
  mId: string

  @ApiProperty({
    type: String
  })
  billingKey: string

  @ApiProperty({
    type: String
  })
  method: string

  @ApiProperty({
    type: String
  })
  cardCompany: string

  @ApiProperty({
    type: String
  })
  cardNumber: string

  @ApiProperty({
    type: String
  })
  authenticatedAt: string

  @ApiProperty({
    type: String
  })
  customerKey: string
}

class CardInfoWithoutCredentials extends PickType(CardInformation, ['mId', 'method', 'cardCompany' ]) {}


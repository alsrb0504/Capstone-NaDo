// .json({
//   statusCode: status,
//   timestamp: new Date().toISOString(),
//   path: request.url,
//   message: exceptionResponse?.statusCode ?
//     exceptionResponse.message :
//     exceptionResponse

import { ApiProperty } from "@nestjs/swagger";

// });

export class exceptionResponseType {
  @ApiProperty({
    type: String
  })
  statusCode: string

  @ApiProperty({
    type: Date
  })
  timestamp: Date

  @ApiProperty({
    type: String
  })
  path: string

  @ApiProperty({
    type: String 
  })
  message: string
}
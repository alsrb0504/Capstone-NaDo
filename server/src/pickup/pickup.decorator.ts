import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { exceptionResponseType } from "src/type/exception/exception.type";
import { Pickup } from "src/type/pickup/pickup.type";

export function PickupDescription() {
  return applyDecorators(
    ApiOkResponse({description: 'success fully picked up', type: 'success'}),
    ApiBadRequestResponse({description: 'already exist pickuped order.', type: exceptionResponseType}),
    ApiInternalServerErrorResponse({description: 'query error or server down', type: exceptionResponseType}),
    ApiBody({type: Pickup}),
    ApiOperation({
      summary: '픽업하기',
      description: '픽업을 위한 api, 로그인 된 사용자만 이용가능하다.'
    }) 
  )
}
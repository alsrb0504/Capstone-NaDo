import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { exceptionResponseType } from "src/type/exception/exception.type";
import { OrderDetail } from "src/type/order/order.type";
import { Pickup } from "src/type/pickup/pickup.type";

export function PickupDescription() {
  return applyDecorators(
    ApiOkResponse({description: 'success fully picked up', type: 'success'}),
    ApiForbiddenResponse({description: 'already exist pickuped order.', type: exceptionResponseType}),
    ApiInternalServerErrorResponse({description: 'query error or server down', type: exceptionResponseType}),
    ApiBody({type: Pickup}),
    ApiOperation({
      summary: '픽업하기',
      description: '픽업을 위한 api, 로그인 된 사용자만 이용가능하다.'
    }) 
  )
}

export function PickupDetailDescription() {
  return applyDecorators(
    ApiOkResponse({description: 'successfully fetched pickup detail information', type: OrderDetail}),
    ApiForbiddenResponse({description: 'not exist pickup data', type: exceptionResponseType}),
    ApiInternalServerErrorResponse({description: 'query error or server down', type: exceptionResponseType}),
    ApiQuery({name: 'pickupSequence'}),
    ApiOperation({
      summary: '픽업 상세 정보',
      description: '픽업 상세 정보를 반환하는 api, 로그인 된 사용자만 이용가능하다.'
    }) 
  )
}
import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { exceptionResponseType } from "src/type/exception/exception.type";
import { OrderPay, WaitOrder } from "src/type/order/order.type";

export function orderPayDescription() {
  return applyDecorators(
    ApiOkResponse({description: '성공적으로 주문이 완료되었습니다.', type: String}),
    ApiBadRequestResponse({description: '시간의 형식이 맞지 않습니다.', type: exceptionResponseType}),
    ApiInternalServerErrorResponse({description: 'query error', type: exceptionResponseType}),
    ApiBody({type: OrderPay}),
    ApiOperation({
      summary: '주문하기',
      description: '주문하기 api, 로그인 된 사용자만 사용가능하며, 주문 시 주문정보가 데이터베이스에 담긴다.'
    })
  )
}

export function orderListDescription() {
  return applyDecorators(
    ApiOkResponse({description: '주문이 성공적으로 반환됩니다.', type: WaitOrder, isArray: true}),
    ApiInternalServerErrorResponse({description: 'query error', type: exceptionResponseType}),
    ApiOperation({
      summary: '주문 목록 받아오기',
      description: '주문 목록 받아오는 api, 로그인 된 사용자만 사용가능하며, 주문 시 유저의 주문 목록이 반환된다.'
    })
  )
}
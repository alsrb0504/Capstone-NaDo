import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { exceptionResponseType } from "src/type/exception/exception.type";
import { OrderDetail, OrderPay, OrderSequence, SettleOrder, WaitOrder } from "src/type/order/order.type";

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

export function orderdetailDescription() {
  return applyDecorators(
    ApiOkResponse({description: '주문을 성공적으로 반환합니다.', type: OrderDetail}),
    ApiInternalServerErrorResponse({description: 'query error', type: exceptionResponseType}),
    ApiOperation({
      summary: '주문 상세 정보 api',
      description: '주문의 상세목록을 보내준다.'
    })
  )
}

export function OrderCompleteDescription() {
  return applyDecorators(
    ApiOkResponse({description: '배달을 성공적으로 수령했습니다', type: String}),
    ApiForbiddenResponse({description: 'order information is not exists', type: exceptionResponseType}),
    ApiInternalServerErrorResponse({description: 'query error', type: exceptionResponseType}),
    ApiBody({type: OrderSequence}),
    ApiOperation({
      summary: '주문 완료 api',
      description: '배달 완료를 확인하기 위한 api'
    })
  )
}

export function SettleOrderDescription() {
  return applyDecorators(
    ApiOkResponse({description: '완료 된 주문내역을 성공적으로 반환했습니다.', type: SettleOrder, isArray: true}),
    ApiInternalServerErrorResponse({description: 'query error', type: exceptionResponseType}),
    ApiQuery({name: 'startTime', description: '반드시 2022-11-23 형식으로 보내주세요'}),
    ApiQuery({name: 'endTime', description: '반드시 2022-11-23 형식으로 보내주세요'}),
    ApiOperation({
      summary: '주문 내역',
      description: '성공된 주문 내역을 반환하는 api'
    })
  )
}
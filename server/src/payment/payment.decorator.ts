import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { exceptionResponseType } from "src/type/exception/exception.type";
import { CardType } from "src/type/payment/card.type";

export function InsertCardDescription() {
  return applyDecorators(
    ApiCreatedResponse({description: '카드가 성공적으로 등록되었습니다', type: 'success'}),
    ApiForbiddenResponse({description: '이미 등록된 카드가 존재합니다. (카드는 하나만 등록가능합니다)', type: exceptionResponseType}),
    ApiInternalServerErrorResponse({description: 'server error', type: exceptionResponseType}),
    ApiBody({type: CardType}),
    ApiOperation({
      summary: '카드 등록',
      description: '카드를 등록하기 위한 api, 이 api의 경우 로그인 된 사용자만 접근가능하며, 이미 카드를 등록한 사용자는 사용할 수 없다.'
    })
  )
}

export function DeleteCardDescription() {
  return applyDecorators(
    ApiOkResponse({description: '카드가 성공적으로 삭제되었습니다.', type: 'success'}),
    ApiForbiddenResponse({description: '유저는 카드를 등록하지 않았습니다.', type: exceptionResponseType}),
    ApiInternalServerErrorResponse({description: 'server error', type: exceptionResponseType}),
    ApiOperation({
      summary: '카드 삭제',
      description: '카드 삭제하기 api, 이 api의 경우 로그인 된 사용자만 접근가능하며. '
    })
  )
}

export function GetCardInfoDescription() {
  return applyDecorators(
    ApiOkResponse({description: '카드 정보가 성공적으로 반환 되었습니다.'}),
    ApiForbiddenResponse({description: '간편 결제가 등록되어 있지 않습니다.', type: exceptionResponseType}),
    ApiInternalServerErrorResponse({ description: '쿼리 실패 또는 토스 서버 요청 실패', type: exceptionResponseType}),
    ApiOperation({
      summary: '카드 정보 가져오기',
      description: '카드 정보 가져오는 api, 로그인된 사용자만 접근가능하다.'
    }) 
  )
}
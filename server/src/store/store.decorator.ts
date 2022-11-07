import { applyDecorators } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { StoreDetail, StoreList } from "src/type/store/store.type";

export function GetAllStoreDescription() {
  return applyDecorators(
    ApiOkResponse({description: 'this api send all store information', type: StoreList, isArray: true}),
    ApiInternalServerErrorResponse({description: 'query error'}),
    ApiOperation({
      summary: 'get all store',
      description: 'this api router send store\'s all information'
    }) 
  )
}

export function GetStoreByIdDescription() {
  return applyDecorators(
    ApiOkResponse({description: 'successfully fetched specific store information', type: StoreDetail}),
    ApiInternalServerErrorResponse({description: 'query error'}),
    ApiOperation({
      summary: 'get specific store',
      description: '스토어의 sequence를 통해 특정 카페의 정보를 가져오는 API'
    }) 
  )
}
import { applyDecorators } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { StoreList } from "src/type/store/store.type";

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
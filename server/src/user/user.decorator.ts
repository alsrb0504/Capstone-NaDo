import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiForbiddenResponse, ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ResponseUser } from "src/type/user/user.type";



export function ChangePasswordDescription () {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'if your client password was successfully changed.'}),
    ApiForbiddenResponse({description: 'this password is not same the stored password'}),
    ApiInternalServerErrorResponse({description: 'it maybe caused by query statement or bcrypt error'}),
    ApiOperation({
      summary: 'change password api',
      description: '이 api의 경우 비밀번호를 변경하기 위해 사용하는 api이며, 로그인된 상태에서만 접근가능하다.',
    })
  )
}

export function ChangeProfileDescription() {
  return applyDecorators(
    ApiResponse({ status: 200, description: '프로필 변경이 성공적으로 완료되었을 때, (닉네임, 이미지경로) 반환 ', type: ResponseUser}),
    ApiInternalServerErrorResponse({ description: '쿼리문 에러가 발생했을 때'}),
    ApiOperation({
      summary: 'change profile api',
      description: '이 api의 경우 유저의 프로필을 바꾸는 api입니다. 유저의 프로필은 닉네임과 프로필 사진으로 이루어져 있는데, 닉네임은 일반적인 폼데이터로 받을 수 있지만 사진의 경우 multipart/form-data 형식으로 보내야합니다.'
    }),
    ApiFile("image")
  )
}

// @Post()
// @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
// @ApiResponse({ status: 403, description: 'Forbidden.'})
// async create(@Body() createCatDto: CreateCatDto) {
//   this.catsService.create(createCatDto);
// }

export function ApiFile(fieldName: string = 'file') {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
   	    type: 'object',
    	properties: {
    	  [fieldName]: { 
            type:'string',
        	format: 'binary'
      	  },
        nickname: {
          type: 'string',
          format: 'string'
        }
    	},
      },
    }),
  );
}
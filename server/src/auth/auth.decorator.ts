import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotAcceptableResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseUser, UserBody, UserLogin, UserRegister } from "src/type/user/user.type";

export function UserRegisterDescription() {
  return applyDecorators(
    ApiResponse({status: 201, description: 'user is successfully created, this return only status', type: ResponseUser}),
    ApiForbiddenResponse({description: 'user is not logged in'}),
    ApiNotAcceptableResponse({ description: 'user is already exists'}),
    ApiInternalServerErrorResponse({ description: 'query or encryption error'}),
    ApiOperation({
      summary: 'register local user api',
      description: '로컬 유저 회원가입 api로 user id, nickname, password, email 정보를 받고 생성한다.'
    }),
    ApiBody({ type: [UserRegister]})
  )
}

export function UserLoginDescription() {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'login success'}),
    ApiForbiddenResponse({ description: 'user is already logged in'}),
    ApiUnauthorizedResponse({ description: 'user login fail'}),
    ApiInternalServerErrorResponse({ description: 'query error or encrypt error'}),
    ApiOperation({
      summary: 'local login api',
      description: 'login을 위한 api 로그인 user identifier와 password가 주어지면 서버에서 유저가 존재하는지 존재한다면 비밀번호가 맞는지 확인 후 로그인을 성공시킨다.'
    }),
    ApiBody({
      type: [UserLogin]
    })
  )
} 

export function UserLogoutDescription() {
  return applyDecorators(
    ApiOkResponse({description: 'logout success'}),
    ApiForbiddenResponse({description: 'user is not logged in'}),
    ApiOperation({
      summary: 'logout api',
      description: '로그아웃을 위한 api로서, 로컬이든 소셜 로그인이든 공통적으로 사용된다.'
    }),
  )
}

export function GetUserInformationDescription() {
  return applyDecorators(
    ApiOkResponse({description: 'user is sucessfully sended', type: UserBody}),
    ApiForbiddenResponse({description: 'user is not logged in'}),
    ApiOperation({
      summary: 'get user api',
      description: '로그인 시, 쿠키 세션을 읽어 해당 유저의 정보를 보내주는 api'
    })
  )
}

export function UserNaverLoginDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'naver login api',
      description: '네이버 로그인을 위한 api로서, 이 api를 사용하기 위해서는 window.open 또는 <a> 태그를 사용하여 열어야한다. 이 주소를 열면 네이버 로그인 페이지가 열리는데 에러에 대한 부분은 네이버 서버에서 주는 에러로 대체한다.'
    })
  )
}
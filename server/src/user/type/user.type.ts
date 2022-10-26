import { PartialType, PickType } from '@nestjs/mapped-types' 
export interface change_password {
  identifier?: string
  prevPasswd: string,
  newPasswd: string
}

import { IsString, MinLength, MaxLength, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(15)
  identifier: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(15)
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(15)
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  provider: 'naver' | 'local'

}

export class Change_Profile extends PickType(CreateUserDto, ['identifier', 'nickname']) {
  @IsString()
  @IsOptional()
  imagePath: string
}

export class Nickname extends PickType(CreateUserDto, ['nickname']){}
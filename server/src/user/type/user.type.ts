import { PartialType, PickType } from '@nestjs/mapped-types' 
import { ApiProperty, ApiBody } from '@nestjs/swagger';
export interface change_password {
  identifier?: string
  prevPasswd: string,
  newPasswd: string
}



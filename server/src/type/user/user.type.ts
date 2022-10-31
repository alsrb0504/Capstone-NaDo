import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";
import User from "src/entity/user/user.entity";


export class UserBody extends PickType(User, ['identifier', 'nickname', 'email', 'provider', 'imagePath']) {}

export class UserWithPassword extends UserBody {
  
  @ApiProperty({
    description: 'user password',
    minLength: 1,
    maxLength: 256
  })
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  password: string;
}

export class UserProfile extends PickType(UserBody, ['identifier', 'nickname', 'imagePath']) {}

export class ChangePassword extends PickType(UserBody, ['identifier']) {
  @ApiProperty({
    description: 'user new Password',
    minLength: 1,
    maxLength: 12
  })
  newPasswd: string

  @ApiProperty({
    description: 'user new Password',
    minLength: 1,
    maxLength: 12
  })
  prevPasswd: string 
}

export class UserNickname extends PickType(UserBody, ['nickname']) {}

export class UserRegister extends PickType(UserWithPassword, ['identifier', 'nickname', 'email', 'password']) {}

export class UserLogin extends PickType(UserWithPassword, ['identifier', 'password']) {}
import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import User from "src/entity/user/user.entity";

type Success = 'success'

export class UserBody extends PickType(User, ['identifier', 'nickname', 'email', 'provider', 'imagePath']) {}

export class UserWithPassword extends UserBody {
  
  @ApiProperty({
    description: 'user password',
    minLength: 1,
    maxLength: 256,
    type: String
  })
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  password: string;
}

export class UserProfile extends PickType(UserBody, ['identifier',  'imagePath']) {}
export class ChangeNickname extends PickType(UserBody, ['identifier',  'nickname']) {}

export class ChangePassword extends PickType(UserBody, ['identifier']) {
  @ApiProperty({
    description: 'user new Password',
    minLength: 1,
    maxLength: 12,
    type: String
  })
  newPasswd: string

  @ApiProperty({
    description: 'user new Password',
    minLength: 1,
    maxLength: 12,
    type: String
  })
  prevPasswd: string 
}

export class UserNickname extends PickType(UserBody, ['nickname']) {}

export class UserRegister extends PickType(UserWithPassword, ['identifier', 'nickname', 'email', 'password']) {}

export class UserLogin extends PickType(UserWithPassword, ['identifier', 'password']) {}

export class PartialUserBody extends PartialType(UserBody) {}

export class UserImage extends PickType(UserBody, ['imagePath']) {}

export class ResponseUser {

  @IsOptional()
  @ApiProperty({
    description: 'api status: success or fail',
    enum : ['success']
  })
  status: Success 

}

export class ImageChangeResponseUser extends ResponseUser {
  @ApiProperty({
    description: 'api response data: (imagePath), content was optional',
    type: UserImage 
  })
  data: UserImage
}
export class NicknameChangeResponseUser extends ResponseUser {
  @ApiProperty({
    description: 'api response data: (imagePath), content was optional',
    type: UserNickname 
  })
  data: UserNickname
}
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService
  ){}

  async isAlreadyRegistered(
    identifier: string
  ){
      const userInfo = await this.userService.findById(identifier)

      return userInfo ? true : false
  }

  async localValidateUser(
    identifier: string,
    password: string
  ) {
    const userInfo = await this.userService.findById(identifier)

    if(userInfo && await bcrypt.compare(password, userInfo.password)) {
      const { password, ...userInfoWithoutPassword} = userInfo
      return userInfoWithoutPassword
    }

    return null
  }

}

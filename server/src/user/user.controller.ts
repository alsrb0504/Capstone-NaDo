import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

import User from 'src/entity/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ){}

  @Post('insert')
  @HttpCode(200)
  async insertUser(
    @Body() insertData: Partial<User>
  ) {
      await this.userService.insert(insertData)
      return 'success'
  }

  @Get('find')
  async getUserById(
    @Query('identifier') identifier: string
  ){
    const userInfo = await this.userService.findById(identifier)
    const { password, ...userInfoWithoutPassword} = userInfo
    return userInfoWithoutPassword
  }
}

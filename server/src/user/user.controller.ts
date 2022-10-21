import { Body, Controller, ForbiddenException, Get, HttpCode, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import User from 'src/entity/user.entity';
import { isLoggedInGuard } from 'src/auth/guard/cookieAuthentication.guard';
import { change_password, IdWithNickname } from './type/user.type';
import { IdWithNicknamePipe } from './pipe/user.pipe';

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

  @UseGuards(isLoggedInGuard)
  @Post('change_password')
  async changePassword(
    @Body() user: change_password
  ) {
    const isPasswordSame = await this.userService.checkPassword({
      identifier: user.identifier,
      prevPassword: user.prevPassword
    })

    if(!isPasswordSame) throw new ForbiddenException("this password is not same the stored password")

    await this.userService.passwordUpdate({
      newPassword: user.newPassword,
      identifier: user.identifier
    })
  }

  @UseGuards(isLoggedInGuard)
  @Post('change_nickname')
  async changeNickname(
    @Body(IdWithNicknamePipe) idWithNickname: IdWithNickname
  ){
    this.userService.changeNickname(idWithNickname)
  }
}

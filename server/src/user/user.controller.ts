import { Body, Controller, ForbiddenException, Get, HttpCode, InternalServerErrorException, Post, Query, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';

import User from 'src/entity/user.entity';
import { isLoggedInGuard } from 'src/auth/guard/cookieAuthentication.guard';
import { change_password, IdWithNickname } from './type/user.type';
import { IdWithNicknamePipe } from './pipe/user.pipe';
import { ReqWithUser } from 'src/auth/type/request.type';

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
  @HttpCode(200)
  @Post('change_password')
  async changePassword(
    @Request() req: ReqWithUser,
    @Body() user: change_password
  ) {
    const isPasswordSame = await this.userService.checkPassword({
      prevPasswd: user.prevPasswd,
      identifier: req.user.identifier
    })

    if(!isPasswordSame) throw new ForbiddenException("this password is not same the stored password")
    try {
      await this.userService.passwordUpdate({
        newPasswd: user.newPasswd,
        identifier: req.user.identifier
      })
      return 'success'
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }

  }

  @UseGuards(isLoggedInGuard)
  @Post('change_nickname')
  async changeNickname(
    @Body(IdWithNicknamePipe) idWithNickname: IdWithNickname
  ){
    this.userService.changeNickname(idWithNickname)
  }
}

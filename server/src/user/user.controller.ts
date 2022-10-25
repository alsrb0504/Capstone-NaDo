import { Body, Controller, ForbiddenException, Get, HttpCode, InternalServerErrorException, Post, Query, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';

import User from 'src/entity/user.entity';
import { isLoggedInGuard } from 'src/auth/guard/cookieAuthentication.guard';
import { change_password, Nickname } from './type/user.type';
import { IdWithNicknamePipe } from './pipe/user.pipe';
import { ReqWithUser } from 'src/auth/type/request.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4} from 'uuid'
import * as path from 'path';

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
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: path.join(__dirname, "../", "static", "images"),
      filename: (req, file, cb) => {
        const fileName = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
        const extensionName = path.parse(file.originalname).ext
        cb(null, `${fileName}${extensionName}`)
      }
    })
  }))
  @Post('change_profile')
  async changeNickname(
    @Body(IdWithNicknamePipe) nickname: Nickname,
    @UploadedFile() profileFile: Express.Multer.File
  ){
    return {
      nickname: nickname.nickname,
      imagePath: profileFile.path
    } 
    // await this.userService.changeProfile(nickname)
  }
}

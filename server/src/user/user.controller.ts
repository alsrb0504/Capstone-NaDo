import { Body, Controller, ForbiddenException, HttpCode, InternalServerErrorException, Post, Query, UseGuards, Request, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { UserService } from './user.service';

import { isLoggedInGuard } from 'src/auth/guard/cookieAuthentication.guard';
import { IdWithNicknamePipe } from './pipe/user.pipe';
import { ReqWithUser } from 'src/auth/type/request.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4} from 'uuid'
import * as path from 'path';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChangePassword, UserNickname, UserWithPassword} from 'src/type/user/user.type';
import { ChangePasswordDescription, ChangeProfileDescription } from './user.decorator';

@ApiTags("user")
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ){}


  @UseGuards(isLoggedInGuard)
  @HttpCode(200)
  @ChangePasswordDescription()
  @Post('change_password')
  async changePassword(
    @Request() req: ReqWithUser,
    @Body() user: ChangePassword
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
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const imageSavePath = path.join(__dirname, "..", "static", "images/")
        console.log(imageSavePath)
        cb(null, imageSavePath)
      },
      filename: (req, file, cb) => {
        const fileName = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
        const extensionName = path.parse(file.originalname).ext
        cb(null, `${fileName}${extensionName}`)
      }
    })
  }))
  @Post('change_profile')

  @ChangeProfileDescription()
  @HttpCode(200)
  async changeNickname(
    @Request() req: ReqWithUser,
    @Body(IdWithNicknamePipe) body: UserNickname,
    @UploadedFile() profileFile: Express.Multer.File
  ){
    await this.userService.changeProfile({
      nickname: body.nickname,
      imagePath: profileFile.filename,
      identifier: req.user.identifier 
    })
    return {
      status: 'success'
    } 
  }
}
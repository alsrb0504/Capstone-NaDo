import { Body, Controller, ForbiddenException, HttpCode, InternalServerErrorException, Post, Response, UseGuards, Request, UseInterceptors, UploadedFile, Get, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

import { isLoggedInGuard } from 'src/auth/guard/cookieAuthentication.guard';
import { IdWithNicknamePipe } from './pipe/user.pipe';
import { ReqWithUser } from 'src/auth/type/request.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4} from 'uuid'
import * as path from 'path';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChangePassword, ImageChangeResponseUser, ResponseUser, UserNickname, UserWithPassword} from 'src/type/user/user.type';
import { ChangeImageDescription, ChangePasswordDescription, ChangeNicknameDescription } from './user.decorator';

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
  ): Promise<ResponseUser> {
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
      return {
        status: 'success'
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  @UseGuards(isLoggedInGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        if(!file) {
          throw new BadRequestException('file is not selected')
        }
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
  @Post('change_image')
  @ChangeImageDescription()
  @HttpCode(200)
  async changeImage(
    @Request() req: ReqWithUser,
    @Response() res: Express.Response,
    @UploadedFile() profileFile: Express.Multer.File
  ): Promise<ImageChangeResponseUser>{

    const serveImgUrl = 'http://localhost:3001/file/' + profileFile.filename

    await this.userService.changeImage({
      imagePath: serveImgUrl,
      identifier: req.user.identifier 
    })
    
    return {
      status: 'success',
      data: {
        imagePath: serveImgUrl
      }
    } 
  }

  @Post("/change_nickname")
  @ChangeNicknameDescription()
  @HttpCode(200)
  async changeNickname(
    @Body(IdWithNicknamePipe) body: {nickname: string},
    @Request() req: ReqWithUser
  ) {
    
    await this.userService.changeNickname({
      nickname: body.nickname,
      identifier: req.user.identifier
    })

    return {
      status: 'success',
      body: {
        nickname: body.nickname
      }
    }
  } 

}
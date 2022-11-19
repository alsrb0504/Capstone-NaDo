import { Body, Controller, Post, UseGuards, HttpCode, Get, Request, Response, NotAcceptableException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcryptjs';
import * as express from 'express'
import { ReqWithUser } from './type/request.type';

import User from 'src/entity/user/user.entity';

import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { isLoggedInGuard, isNotLoggedInGuard} from './guard/cookieAuthentication.guard';
import { LoginWithCredentialsGuard, NaverLoginWithCredentialsGuard } from './guard/loginWithCredentials.guard';
import { ApiTags } from '@nestjs/swagger';
import { ResponseUser, UserRegister } from 'src/type/user/user.type';
import { GetUserInformationDescription, UserLoginDescription, UserNaverLoginDescription, UserRegisterDescription } from './auth.decorator';


@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @UseGuards(isNotLoggedInGuard)
  @HttpCode(201)
  @UserRegisterDescription()
  @Post('local/register')
  async registerUser(
    @Body() user: UserRegister
  ): Promise<ResponseUser> {
      const isRegistered = await this.authService.isAlreadyRegistered(user.identifier)
      if(isRegistered) {
        throw new NotAcceptableException("this user already exist")
      }
      const hashedPassword = await bcrypt.hash(user.password, 10)

      await this.userService.insert({
        identifier: user.identifier,
        password: hashedPassword,
        nickname: user.nickname,
        email: user.email,
        provider: 'local'
      })

      return {
        status: 'success',
      }
    }

    @UseGuards(isNotLoggedInGuard, LoginWithCredentialsGuard)
    @HttpCode(200)
    @UserLoginDescription()
    @Post('local/login')
    async login(@Request() req) {
      return req.user;
    }

    @UseGuards(isLoggedInGuard)
    @HttpCode(200)
    @UserLoginDescription()
    @Post('local/logout')
    async logout(
      @Request() req,
      @Response() res
      ) {
      req.logout(() => {
        res.send("success")
      })
    }

    @UseGuards(isLoggedInGuard)
    @Get('local')
    @GetUserInformationDescription()
    loginPersist(
      @Request() req: ReqWithUser
    ) {
      return req.user
    }

    @UseGuards(AuthGuard('naver'))
    @UserNaverLoginDescription()
    @Get('social/login')
    naverLogin() {}

    @UseGuards(NaverLoginWithCredentialsGuard)
    @Get('social/login/callback')
    async naverLoginCallback(
      @Request() req: ReqWithUser,
      @Response() res: express.Response,
    ) {

      const { identifier } = req.user

      const userInfo = await this.userService.findById(identifier)

      if(!userInfo) {
        try {
          await this.userService.insert(req.user)
        } catch (err) {
          console.log("userService.Insert Error")
        }
      }

      res.redirect("http://localhost:3002/")
    }
  }

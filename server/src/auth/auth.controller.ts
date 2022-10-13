import { Body, Controller, Post, UseGuards, HttpCode, Get, Request, Response, NotAcceptableException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcryptjs';
import * as express from 'express'
import { ReqWithUser, NecessaryUserInfo } from './type/request.type';

import User from 'src/entity/user.entity';

import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { isLoggedInGuard, isNotLoggedInGuard} from './guard/cookieAuthentication.guard';
import { LoginWithCredentialsGuard, NaverLoginWithCredentialsGuard } from './guard/loginWithCredentials.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @UseGuards(isNotLoggedInGuard)
  @HttpCode(201)
  @Post('local/register')
  async registerUser(
    @Body() user: NecessaryUserInfo
  ): Promise<boolean> {
      const isRegistered = await this.authService.isAlreadyRegistered(user.identifier)
      if(isRegistered) {
        throw new NotAcceptableException("this user already exist")
      }
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(user.password, salt)

      this.userService.insert({
        identifier: user.identifier,
        password: hashedPassword,
        nickname: user.nickname,
        email: user.email,
        provider: 'local'
      })
      return true
    }

    @UseGuards(isNotLoggedInGuard, LoginWithCredentialsGuard)
    @HttpCode(200)
    @Post('local/login')
    async login(@Request() req) {
      return req.user;
    }

    @UseGuards(isLoggedInGuard)
    @HttpCode(200)
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
    loginPersist(
      @Request() req: ReqWithUser
    ) {
      return req.user
    }

    @UseGuards(AuthGuard('naver'))
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

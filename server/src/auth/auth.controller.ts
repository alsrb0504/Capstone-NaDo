import { Body, Controller, Post, UseGuards, Request, HttpCode, Get, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcryptjs';

import User from 'src/entity/user.entity';

import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('local/register')
  @HttpCode(201)
  async registerUser(
    @Body() user: Partial<User>
  ) {
      const isRegistered = await this.authService.isAlreadyRegistered(user.identifier)
      if(isRegistered) {
        return 'fail'
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
      return 'success'
    }

    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    @Post('local/login')
    async login(@Request() req) {
      return req.user;
    }

    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    @Post('local/logout')
    async logout(
      @Request() req,
      @Response() res
      ) {
      req.logout(() => {
        res.redirect("http://localhost:3002/")
      })
    }

  }

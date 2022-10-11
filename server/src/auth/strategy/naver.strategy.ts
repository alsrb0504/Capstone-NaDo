import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-naver';
import User from "src/entity/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class NaverLoginStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private userService: UserService
  ) {
    super({
      clientID: configService.get<string>('naver_login.clientId'),
      clientSecret: configService.get<string>("naver_login.clientSecret"),
      callbackUrl: configService.get<string>('naver_login.callbackUrl')
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ): Promise<Partial<User>> {
   const email = profile.emails[0].value;
   const nickname = profile._json.nickname;

   return {
    provider: 'naver',
    email,
    nickname
   }
  }
}
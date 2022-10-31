import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-naver';
import User from "src/entity/user/user.entity";

@Injectable()
export class NaverLoginStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
  ) {
    const clientID = configService.get<string>('naver_login.clientId')
    const clientSecret =  configService.get<string>("naver_login.clientSecret")
    const callbackURL =  configService.get<string>('naver_login.callbackUrl')
    
    super({
      clientID,
      clientSecret, 
      callbackURL,
      svcType: 0,
      authType: 'reauthenticate'
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ): Promise<Partial<User>> {
   const email = profile.emails[0].value;
   const identifier = email.split('@')[0];
   const nickname = profile._json.nickname;

   return {
    provider: 'naver',
    identifier,
    email,
    nickname
   }
  }
}
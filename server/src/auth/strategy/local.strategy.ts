import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from '../auth.service';
import { PassportStrategy } from "@nestjs/passport";
import User from "src/entity/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ){
    super({
      usernameField: 'identifier'
    })
  }

  async validate(identifier: string, password: string): Promise<Partial<User>> {
    console.log('adsf')
    const user = await this.authService.localValidateUser(identifier, password);
    if(!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
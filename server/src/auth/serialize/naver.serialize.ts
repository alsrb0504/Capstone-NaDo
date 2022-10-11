import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import User from "src/entity/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class NaverSerializer extends PassportSerializer {
  constructor(
    private readonly userService: UserService
  ) {
    super()
  }

  serializeUser(user: Partial<User>, done: Function) {
    done(null, user.email)
  }

  async deserializeUser(email: any, done: Function) {
    const user = await this.userService.findByEmail(email) 
    done(null, user)
  }
}
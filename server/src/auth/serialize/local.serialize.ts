import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly userService: UserService
  ) {
    super()
  }

  serializeUser(user: any, done: Function) {
    done(null, user.identifier)
  }

  async deserializeUser(identifier: any, done: Function) {
    const user = await this.userService.findById(identifier) 
    done(null, user)
  }
}
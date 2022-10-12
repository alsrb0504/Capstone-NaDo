import { Request } from 'express'
import User from 'src/entity/user.entity'

export interface ReqWithUser extends Request {
  user: User
}

export interface NecessaryUserInfo extends Pick<User, 'identifier' | 'email' | 'password' | 'provider' | 'nickname'> {}
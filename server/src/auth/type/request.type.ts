import { Request } from 'express'
import User from 'src/entity/user.entity'

export interface ReqWithUser extends Request {
  user: User
}
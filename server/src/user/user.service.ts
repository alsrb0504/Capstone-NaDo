import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'

import User from 'src/entity/user.entity';
import { change_password, IdWithNickname } from './type/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}

 async insert(
    insertData: Partial<User>
  ): Promise<void> {
    await this.userRepository
      .createQueryBuilder('user')
      .insert()
      .into(User)
      .values([insertData])
      .execute()
  }

  async findById(
    identifier: string
  ): Promise<Partial<User>> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.identifier = :id', {id: identifier})
      .getOne()
  }

  async findByEmail(
    email: string
  ): Promise<Partial<User>> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.identifier = :email', {email})
      .getOne()
  }

  async passwordUpdate(
    newUserInfo: Partial<change_password>
  ) {

    try {
      const {newPassword, identifier} = newUserInfo
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(newPassword, salt)
      
      await this.userRepository
        .createQueryBuilder('user')
        .update(User)
        .set({
          password: password
        })
        .where("identifier = :identifier", {identifier})
        .execute()
    } catch(err) {
      throw new Error(err.message)
    }
  }

  async checkPassword(
    userCredentials: Partial<change_password>
  ) {

    const userInfo = await this.findById(userCredentials.identifier)
    if(!userInfo) throw new ForbiddenException("user is not exist")

    return await bcrypt.compare(userCredentials.prevPassword, userInfo.password)
  }

  async changeNickname(
    idWithNickname: IdWithNickname
  ) {
    const {identifier, nickname} = idWithNickname

    try {
      await this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .set({ nickname })
      .where("identifier = :identifier", {identifier})
      .execute() 
    } catch (err) {
      throw new ForbiddenException(err.message)
    }
  }

}



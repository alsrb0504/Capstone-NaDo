import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'

import User from 'src/entity/user.entity';
import { change_password, Change_Profile, Nickname } from './type/user.type';

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
      const {newPasswd, identifier} = newUserInfo
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(newPasswd, salt)
      
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
    console.log(userCredentials.prevPasswd, userInfo.password)

    return await bcrypt.compare(userCredentials.prevPasswd, userInfo.password)
  }

  async changeProfile(
    profileInfo : Change_Profile
  ) {
    const {nickname, imagePath, identifier} = profileInfo

    

    try {
      await this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .set({ 
        nickname,
        imagePath
      })
      .where("identifier = :identifier", {identifier})
      .execute() 
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async fetchProfileImage(
    identifier: string
  ) {
    try {
      const imagePath = await this.userRepository
        .createQueryBuilder('user')
        .select("imagePath")
        .from(User, "user")
        .where("user.identifier = :identifier", { identifier })
        .getOne()

      console.log(imagePath)
      
      return imagePath
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

}



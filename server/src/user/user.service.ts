import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'

import User from 'src/entity/user/user.entity';
import { ChangePassword, UserProfile, UserBody } from 'src/type/user/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}

 async insert(
    insertData: Partial<User>
  ): Promise<void> {
    try {
      await this.userRepository
        .createQueryBuilder('user')
        .insert()
        .into(User)
        .values([insertData])
        .execute()
    } catch (err) {
      throw new InternalServerErrorException("user insert error")
    }
    
  }

  async findById(
    identifier: string
  ): Promise<Partial<User>> {
    try {
      const data = await this.userRepository
        .createQueryBuilder('user')
        .where('user.identifier = :id', {id: identifier})
        .getOne()
      return data
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
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
    newUserInfo: Partial<ChangePassword>
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
    userCredentials: Partial<ChangePassword>
  ) {
    const userInfo = await this.findById(userCredentials.identifier)
    if(!userInfo) throw new ForbiddenException("user is not exist")
    console.log(userCredentials.prevPasswd, userInfo.password)

    return await bcrypt.compare(userCredentials.prevPasswd, userInfo.password)
  }

  async changeProfile(
    profileInfo : UserProfile
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



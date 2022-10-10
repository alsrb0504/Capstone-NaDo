import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import User from 'src/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>){}

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
}



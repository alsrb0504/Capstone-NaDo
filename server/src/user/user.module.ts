import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IdWithNicknamePipe } from './pipe/user.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService, IdWithNicknamePipe],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}

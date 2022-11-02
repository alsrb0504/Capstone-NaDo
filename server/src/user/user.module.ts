import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entity/user/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IdWithNicknamePipe } from './pipe/user.pipe';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      dest: "../static"
    })
  ],
  providers: [UserService, IdWithNicknamePipe],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { LocalSerializer } from './serialize/local.serialize';
import { NaverLoginStrategy } from './strategy/naver.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, ConfigModule],
  providers: [AuthService, LocalStrategy, LocalSerializer, NaverLoginStrategy],
  controllers: [AuthController]
})
export class AuthModule {}

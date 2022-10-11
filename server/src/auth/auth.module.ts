import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { LocalSerializer } from './serialize/local.serialize';
import { NaverLoginStrategy } from './strategy/naver.strategy';
import { NaverSerializer } from './serialize/naver.serialize';

@Module({
  imports: [UserModule],
  providers: [AuthService, LocalStrategy, LocalSerializer, NaverLoginStrategy, NaverSerializer],
  controllers: [AuthController]
})
export class AuthModule {}

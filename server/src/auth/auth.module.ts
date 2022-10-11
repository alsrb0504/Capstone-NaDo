import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { LocalSerializer } from './serialize/local.serialize';

@Module({
  imports: [UserModule],
  providers: [AuthService, LocalStrategy, LocalSerializer],
  controllers: [AuthController]
})
export class AuthModule {}

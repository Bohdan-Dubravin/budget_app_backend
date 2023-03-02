import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { RtStrategy } from './strategies/rt-strategy';
import { AtStrategy } from './strategies/at-strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, RtStrategy, AtStrategy],
  controllers: [AuthController],
  imports: [UserModule, JwtModule.register({})],
})
export class AuthModule {}

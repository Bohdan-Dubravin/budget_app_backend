import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { RtStrategy } from './strategies/rt-strategy';
import { AtStrategy } from './strategies/at-strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, RtStrategy, AtStrategy],
})
export class AuthModule {}

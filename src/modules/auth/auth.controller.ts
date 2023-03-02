import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Tokens } from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login();
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('local/register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('local/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login();
  }
}

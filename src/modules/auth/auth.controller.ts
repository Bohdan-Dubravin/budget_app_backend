import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Tokens } from 'src/types';
import { LoginDto } from './dto/login.dto';
import { AtGuard, RtGuard } from './guards';
import { GetCurrentUser } from './decorators';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CredentialsForAuth } from './entities/credential.entiti';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, type: [CredentialsForAuth] })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Login with email & password' })
  @ApiResponse({ status: 201, type: [CredentialsForAuth] })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Logout from device' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200 })
  @UseGuards(AtGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUser('userId') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.logout(userId, refreshToken);
  }

  @ApiOperation({ summary: 'Logout from all devices' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200 })
  @UseGuards(AtGuard)
  @Get('logout-all')
  @HttpCode(HttpStatus.OK)
  logoutFromAllDevices(@GetCurrentUser('userId') userId: string) {
    return this.authService.logoutFromAllDevices(userId);
  }

  @ApiOperation({ summary: 'Get new pair access and refresh tokens' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200 })
  @UseGuards(RtGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUser('sub') userId: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @ApiOperation({ summary: 'get userInfo' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200 })
  @UseGuards(AtGuard)
  @Get('getme')
  @HttpCode(HttpStatus.OK)
  getMe(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUser('sub') userId: string,
  ) {
    return this.authService.getMe(userId);
  }
}

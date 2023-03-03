import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { Tokens } from 'src/types';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/Prisma.service';
import * as argon from 'argon2';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<Tokens> {
    const user = await this.userService.createUser(dto);

    const tokens = await this.signTokens(user.id, user.email);

    await this.updateRefreshTokenInDb(user.id, tokens.refreshToken);
    return tokens;
  }

  async login(dto: LoginDto): Promise<Tokens> {
    const existUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!existUser) {
      throw new ForbiddenException('Email or password is wrong');
    }

    const passwordMatch = await argon.verify(existUser.password, dto.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Email or password is wrong');
    }

    const tokens = await this.signTokens(existUser.id, existUser.email);

    await this.updateRefreshTokenInDb(existUser.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: '60f11350-df47-4f18-8c81-aeb5095de36a',
        refreshToken: { not: null },
      },
      data: { refreshToken: null },
    });
    return;
  }

  async refreshTokens() {}

  async signTokens(userId: string, email: string): Promise<Tokens> {
    const accessToken = this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: '15m', secret: 'dsffdfww' },
    );

    const refreshToken = this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: '30d', secret: "'efefewww'" },
    );
    const [at, rt] = await Promise.all([accessToken, refreshToken]);
    return { accessToken: at, refreshToken: rt };
  }

  async updateRefreshTokenInDb(userId: string, refreshToken: string) {
    const hash = await argon.hash(refreshToken);

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hash },
    });
  }
}

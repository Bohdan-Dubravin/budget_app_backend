import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { Tokens } from 'src/types';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/Prisma.service';
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

    await this.updateTokenInDb(user.id, tokens.refreshToken);
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

    await this.updateTokenInDb(existUser.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string, refreshToken: string) {
    await this.prisma.refreshToken.deleteMany({
      where: {
        id: userId,
        refreshToken,
      },
    });
    return;
  }

  async logoutFromAllDevices(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
    return;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { refreshTokens: true },
    });

    if (!user) {
      throw new ForbiddenException('Access denied');
    }
    const tokenMatches = user.refreshTokens.some((token) => {
      return token.refreshToken === refreshToken;
    });

    if (!tokenMatches) {
      throw new ForbiddenException('Access denied');
    }
    await this.prisma.refreshToken.deleteMany({
      where: { refreshToken },
    });

    const newTokens = await this.signTokens(user.id, user.email);
    await this.updateTokenInDb(user.id, newTokens.refreshToken);

    return newTokens;
  }

  async signTokens(userId: string, email: string): Promise<Tokens> {
    const accessToken = this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: '15m', secret: 'dsffdfww' },
    );

    const refreshToken = this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: '30d', secret: 'refresh' },
    );
    const [at, rt] = await Promise.all([accessToken, refreshToken]);
    return { accessToken: at, refreshToken: rt };
  }

  async updateTokenInDb(userId: string, refreshToken: string) {
    await this.prisma.refreshToken.create({
      data: { refreshToken, userId },
    });

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    // await this.prisma.refreshToken.deleteMany({
    //   where:  { createdAt: { lt: thirtyDaysAgo } },
    // });
    await this.prisma.refreshToken.deleteMany({
      where: { OR: [{ createdAt: { lt: thirtyDaysAgo }, refreshToken }] },
    });
  }
}

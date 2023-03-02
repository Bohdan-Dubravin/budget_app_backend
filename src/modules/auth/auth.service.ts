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

  async login() {}

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

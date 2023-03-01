import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as argon from 'argon2';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async createUser(dto: CreateUserDto) {
    const isExist = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (isExist) {
      throw new ForbiddenException('Email already taken');
    }

    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: { ...dto, password: hash },
    });
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    const isExist = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (isExist) {
      throw new ForbiddenException('Email already taken');
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });

    delete user.password;
    return user;
  }
}

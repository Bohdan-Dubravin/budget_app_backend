import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as argon from 'argon2';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaClient, private userService: UserService) {}

  async register(dto: CreateUserDto) {}

  async login() {}
}

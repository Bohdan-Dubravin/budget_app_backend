import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/Prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(userId: string, dto) {}

  async getAllCategories(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      select: {
        amount: true,
      },
    });

    return transactions;
  }
}

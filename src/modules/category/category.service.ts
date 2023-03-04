import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/Prisma.service';
import { NewCategoryDto } from './dto/new-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(userId: string, dto: NewCategoryDto) {
    const category = this.prisma.category.create({ data: { ...dto, userId } });

    return category;
  }

  async updateCategory(
    categoryId: string,
    userId: string,
    dto: NewCategoryDto,
  ) {
    const category = this.prisma.category.updateMany({
      where: { id: categoryId, userId },
      data: { ...dto },
    });

    return category;
  }

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

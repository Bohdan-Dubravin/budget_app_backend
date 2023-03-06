import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/Prisma.service';
import { EditCategoryDto } from './dto/edit-category.dto copy';
import { NewCategoryDto } from './dto/new-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(userId: string, dto: NewCategoryDto) {
    const category = await this.prisma.category.create({
      data: { ...dto, userId },
    });

    return category;
  }

  async updateCategory(
    categoryId: string,
    userId: string,
    dto: EditCategoryDto,
  ) {
    const category = await this.prisma.category.updateMany({
      where: { id: categoryId, userId },
      data: { ...dto },
    });

    return category;
  }

  async deleteCategory(categoryId: string, userId: string) {
    const category = await this.prisma.category.deleteMany({
      where: { id: categoryId, userId },
    });

    return category;
  }

  async getAllCategories(userId: string) {
    const categories = await this.prisma.category.findMany({
      where: { userId },
      include: { transactions: { select: { amount: true, createdAt: true } } },
    });

    return categories;
  }

  async getCategoryById(userId: string, categoryId: string) {
    const categories = await this.prisma.category.findMany({
      where: { id: categoryId, userId },
      include: { transactions: true },
    });

    return categories;
  }
}

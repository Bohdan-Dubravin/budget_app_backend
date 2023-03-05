import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { NewCategoryDto } from './dto/new-category.dto';
import { CategoryService } from './category.service';
import { AtGuard } from '../auth/guards';
import { GetCurrentUser } from '../auth/decorators';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AtGuard)
  @Get()
  getAllCategories(@GetCurrentUser('userId') userId: string) {
    return this.categoryService.getAllCategories(userId);
  }

  @UseGuards(AtGuard)
  @Post()
  createCategory(
    @Body() dto: NewCategoryDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.categoryService.createCategory(userId, dto);
  }
}

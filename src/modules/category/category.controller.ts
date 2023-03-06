import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NewCategoryDto } from './dto/new-category.dto';
import { CategoryService } from './category.service';
import { AtGuard } from '../auth/guards';
import { GetCurrentUser } from '../auth/decorators';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';
import { EditCategoryDto } from './dto/edit-category.dto copy';
import { FullCategoryEntity } from './entities/FullCategory.entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get all user categories' })
  @ApiResponse({ status: 200, type: [CategoryEntity] })
  @UseGuards(AtGuard)
  @Get()
  getAllCategories(@GetCurrentUser('userId') userId: string) {
    return this.categoryService.getAllCategories(userId);
  }

  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: 201, type: CategoryEntity })
  @UseGuards(AtGuard)
  @Post()
  createCategory(
    @Body() dto: NewCategoryDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.categoryService.createCategory(userId, dto);
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 201, type: CategoryEntity })
  @UseGuards(AtGuard)
  @Patch(':categoryId')
  updateCategory(
    @Body() dto: EditCategoryDto,
    @GetCurrentUser('userId') userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoryService.updateCategory(categoryId, userId, dto);
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 204 })
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':categoryId')
  deleteCategory(
    @GetCurrentUser('userId') userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoryService.deleteCategory(categoryId, userId);
  }

  @ApiOperation({ summary: 'Get category by Id with all transaction' })
  @ApiResponse({ status: 200, type: [FullCategoryEntity] })
  @UseGuards(AtGuard)
  @Get(':categoryId')
  getCategoryById(
    @GetCurrentUser('userId') userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoryService.getCategoryById(userId, categoryId);
  }
}

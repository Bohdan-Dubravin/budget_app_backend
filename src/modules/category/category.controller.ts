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
  Query,
  UseGuards,
} from '@nestjs/common';
import { NewCategoryDto } from './dto/new-category.dto';
import { CategoryService } from './category.service';
import { AtGuard } from '../auth/guards';
import { GetCurrentUser } from '../auth/decorators';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';
import { EditCategoryDto } from './dto/edit-category.dto copy';
import { FullCategoryEntity } from './entities/FullCategory.entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get all user categories with expends' })
  @ApiResponse({ status: 200, type: [CategoryEntity] })
  @UseGuards(AtGuard)
  @Get()
  getAllCategories(@GetCurrentUser('userId') userId: string) {
    return this.categoryService.getAllCategories(userId);
  }

  @ApiOperation({
    summary: 'Get all user categories with expends by selected date',
  })
  @ApiResponse({ status: 200, type: [CategoryEntity] })
  @ApiQuery({
    name: 'start',
    example: '05-12-2022',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'end',
    example: '05-01-2023',
    required: true,
    type: String,
  })
  @UseGuards(AtGuard)
  @Get('time-range')
  getAllCategoriesByDate(
    @GetCurrentUser('userId') userId: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.categoryService.getAllCategoriesByDate(userId, start, end);
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

  @ApiOperation({ summary: 'Delete category with it`s all transactions' })
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

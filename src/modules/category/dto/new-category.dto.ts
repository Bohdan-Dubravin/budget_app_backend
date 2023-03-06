import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewCategoryDto {
  @ApiProperty({
    example: 'car',
    description: 'name of the category',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'categoryImg',
    description: 'adds automatically',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  categoryImg?: string;

  @ApiProperty({
    example: 'category bg',
    description: 'adds automatically',
    nullable: true,
  })
  @IsUrl()
  @IsOptional()
  categoryColor?: string;
}

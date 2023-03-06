import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class EditCategoryDto {
  @ApiProperty({
    required: false,
    nullable: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  categoryImg?: string;

  @ApiProperty({
    required: false,
  })
  @IsUrl()
  @IsOptional()
  categoryColor?: string;
}

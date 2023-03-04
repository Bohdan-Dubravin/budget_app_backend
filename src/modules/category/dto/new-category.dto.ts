import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class NewCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  categoryImg?: string;

  @IsUrl()
  @IsOptional()
  categoryColor?: string;
}

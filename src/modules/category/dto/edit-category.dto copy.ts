import { IsOptional, IsString, IsUrl } from 'class-validator';

export class EditCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  categoryImg?: string;

  @IsUrl()
  @IsOptional()
  categoryColor?: string;
}

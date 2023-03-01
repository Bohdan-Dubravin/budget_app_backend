import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsString()
  @IsOptional()
  displayedName?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsNumber()
  @IsOptional()
  TotalMonthBudget?: number;

  @IsString()
  @IsOptional()
  currencyFormat?: string;
}

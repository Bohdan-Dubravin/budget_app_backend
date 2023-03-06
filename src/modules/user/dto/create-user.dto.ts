import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'myemail@gmail.com',
    description: 'Unique Email',
    nullable: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password',
    nullable: false,
    example: 'sdni122e91',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @ApiProperty({
    description: 'Name that displayed in interface',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  displayedName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Avatar in app',
    example: 12345,
    nullable: true,
    required: false,
  })
  avatarUrl?: string;

  @ApiProperty({
    description: 'Set budget for one month',
    nullable: true,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  TotalMonthBudget?: number;

  @ApiProperty({
    description: 'Set currency format default ($ US dollar)',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  currencyFormat?: string;
}

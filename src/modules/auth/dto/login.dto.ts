import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({
    example: 'myemail@gmail.com',
    description: 'Unique Email',
    nullable: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '38gd32idun23',
    description: 'password',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class NewTransactionDto {
  @ApiProperty({
    required: true,
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    required: false,
    nullable: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

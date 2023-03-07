import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateTransactionDto {
  @ApiProperty({
    required: false,
    nullable: false,
  })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({
    required: false,
    nullable: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class NewTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;
}

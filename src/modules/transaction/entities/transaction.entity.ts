import { ApiProperty } from '@nestjs/swagger';

export class TransactionEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  userId: string;
}

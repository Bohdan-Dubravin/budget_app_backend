import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '@prisma/client';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';

export class CategoryEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
  @ApiProperty()
  categoryImg: string;
  @ApiProperty()
  categoryColor: string;

  @ApiProperty({ example: 'expends || income' })
  type: string;

  @ApiProperty({ isArray: true })
  transactions: TransactionEntity;
  @ApiProperty()
  userId: string;
}

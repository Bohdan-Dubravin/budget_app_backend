import { ApiProperty } from '@nestjs/swagger';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';

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

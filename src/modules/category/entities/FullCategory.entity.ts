import { ApiProperty } from '@nestjs/swagger';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { CategoryEntity } from './category.entity';

export class FullCategoryEntity extends CategoryEntity {
  @ApiProperty()
  id: string;

  @ApiProperty({ isArray: true })
  transactionsList: TransactionEntity;
}

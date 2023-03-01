import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NewTransactionDto } from './dto/new-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaClient) {}

  async createTransaction(
    userId: string,
    categoryId: string,
    dto: NewTransactionDto,
  ) {
    const transaction = await this.prisma.transaction.create({
      data: {
        amount: dto.amount,
        userId,
        categoryId,
      },
    });
  }
}

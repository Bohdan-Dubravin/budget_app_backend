import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/Prisma.service';
import { NewTransactionDto } from './dto/new-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async getAllUserTransactions(userId: string) {
    const transaction = await this.prisma.transaction.findMany({
      where: { userId },
    });

    return transaction;
  }

  async getTransactionById(transactionId: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    return transaction;
  }

  async createTransaction(
    userId: string,
    categoryId: string,
    dto: NewTransactionDto,
  ) {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...dto,
        userId,
        categoryId,
      },
    });

    return transaction;
  }

  async updateTransaction(
    userId: string,
    transactionId: string,
    dto: NewTransactionDto,
  ) {
    const transaction = await this.prisma.transaction.update({
      where: { id: transactionId },
      data: {
        ...dto,
        userId,
      },
    });

    return transaction;
  }

  async deleteTransaction(userId: string, transactionId: string) {
    const transaction = await this.prisma.transaction.delete({
      where: { id: transactionId },
    });

    return transaction;
  }
}

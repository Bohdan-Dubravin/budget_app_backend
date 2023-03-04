import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/Prisma.service';
import { NewTransactionDto } from './dto/new-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async getAllUserTransactions(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      select: {
        amount: true,
      },
    });

    return transactions;
  }

  async getAllTransactionsByDate(userId: string, start: string, end: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        createdAt: {
          lte: end,
          gte: start,
        },
      },
      select: {
        amount: true,
      },
    });

    return transactions;
  }

  async getTransactionsByCategory(userId: string, categoryId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId, categoryId },
    });

    return transactions;
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
        categoryId: '133210fb-9db8-4b26-b577-5804b2da5b9b',
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
    const transaction = await this.prisma.transaction.deleteMany({
      where: { id: transactionId, userId },
    });

    return transaction;
  }
}

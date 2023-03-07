import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/Prisma.service';
import { NewTransactionDto } from './dto/new-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async getAllUserTransactions(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
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
        categoryId,
      },
    });

    return transaction;
  }

  async updateTransaction(transactionId: string, dto: UpdateTransactionDto) {
    const transaction = await this.prisma.transaction.update({
      where: { id: transactionId },
      data: {
        ...dto,
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

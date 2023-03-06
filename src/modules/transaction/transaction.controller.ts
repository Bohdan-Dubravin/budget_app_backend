import { Controller, Get, UseGuards, Post, Body, Param } from '@nestjs/common';
import { GetCurrentUser } from '../auth/decorators';
import { AtGuard } from '../auth/guards';
import { TransactionService } from './transaction.service';
import { NewTransactionDto } from './dto/new-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(AtGuard)
  @Post(':categoryId')
  createTransaction(
    @GetCurrentUser('userId') userId: string,
    @Param('categoryId') categoryId: string,
    @Body() dto: NewTransactionDto,
  ) {
    return this.transactionService.createTransaction(userId, categoryId, dto);
  }

  @UseGuards(AtGuard)
  @Get('getall')
  getAllUsersTransaction(@GetCurrentUser('userId') userId: string) {
    return this.transactionService.getAllUserTransactions(userId);
  }
}

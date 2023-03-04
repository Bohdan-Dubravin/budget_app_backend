import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { GetCurrentUser } from '../auth/decorators';
import { AtGuard } from '../auth/guards';
import { TransactionService } from './transaction.service';
import { NewTransactionDto } from './dto/new-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(AtGuard)
  @Post()
  createTransaction(
    @GetCurrentUser('userId') userId: string,
    categoryId: string,
    @Body() dto: NewTransactionDto,
  ) {
    console.log(userId);

    return this.transactionService.createTransaction(userId, categoryId, dto);
  }

  @UseGuards(AtGuard)
  @Get('getall')
  getAllUsersTransaction(@GetCurrentUser('sub') userId: string) {
    return this.getAllUsersTransaction(userId);
  }
}

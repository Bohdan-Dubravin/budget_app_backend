import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from '../auth/decorators';
import { AtGuard } from '../auth/guards';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(AtGuard)
  @Get('getall')
  getAllUsersTransaction(@GetCurrentUser('sub') userId: string) {
    return this.getAllUsersTransaction(userId);
  }
}

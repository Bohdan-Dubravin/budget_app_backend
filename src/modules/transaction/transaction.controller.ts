import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { GetCurrentUser } from '../auth/decorators';
import { AtGuard } from '../auth/guards';
import { TransactionService } from './transaction.service';
import { NewTransactionDto } from './dto/new-transaction.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TransactionEntity } from './entities/transaction.entity';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Add new transaction' })
  @ApiResponse({ status: 201, type: TransactionEntity })
  @UseGuards(AtGuard)
  @Post(':categoryId')
  createTransaction(
    @GetCurrentUser('userId') userId: string,
    @Param('categoryId') categoryId: string,
    @Body() dto: NewTransactionDto,
  ) {
    return this.transactionService.createTransaction(userId, categoryId, dto);
  }

  @ApiOperation({ summary: 'Add new transaction' })
  @ApiResponse({ status: 201, type: [TransactionEntity] })
  @UseGuards(AtGuard)
  @Get('getall')
  getAllTransaction(@GetCurrentUser('userId') userId: string) {
    return this.transactionService.getAllUserTransactions(userId);
  }

  @ApiOperation({
    summary: 'Get all transaction between start and end period',
  })
  @ApiQuery({
    name: 'start',
    example: '05-12-2022',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'end',
    example: '05-01-2023',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 201, type: [TransactionEntity] })
  @UseGuards(AtGuard)
  @Get('period')
  getAllTransactionByDate(
    @GetCurrentUser('userId') userId: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.transactionService.getAllTransactionsByDate(userId, start, end);
  }
}

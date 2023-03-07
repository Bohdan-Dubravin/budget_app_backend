import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GetCurrentUser } from '../auth/decorators';
import { AtGuard } from '../auth/guards';
import { TransactionService } from './transaction.service';
import { NewTransactionDto } from './dto/new-transaction.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TransactionEntity } from './entities/transaction.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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

  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 201, type: [TransactionEntity] })
  @UseGuards(AtGuard)
  @Get('getall')
  getAllTransaction(@GetCurrentUser('userId') userId: string) {
    return this.transactionService.getAllUserTransactions(userId);
  }

  @ApiOperation({ summary: 'Update transaction by Id' })
  @ApiResponse({ status: 201, type: TransactionEntity })
  @UseGuards(AtGuard)
  @Patch(':transactionId')
  updateTransaction(
    @Body() dto: UpdateTransactionDto,
    @Param('transactionId') transactionId: string,
  ) {
    return this.transactionService.updateTransaction(transactionId, dto);
  }

  @ApiOperation({ summary: 'Delete transaction by Id' })
  @ApiResponse({ status: 204 })
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':transactionId')
  deleteTransaction(
    @GetCurrentUser('userId') userId: string,
    @Param('transactionId') transactionId: string,
  ) {
    return this.transactionService.deleteTransaction(userId, transactionId);
  }
}

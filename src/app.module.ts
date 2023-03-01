import { Module } from '@nestjs/common';
import { PrismaModule } from './database/Prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    TransactionModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

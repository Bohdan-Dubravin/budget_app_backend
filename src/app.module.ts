import { Module } from '@nestjs/common';
import { PrismaModule } from './database/Prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { CategoryModule } from './modules/category/category.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    TransactionModule,
    CategoryModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

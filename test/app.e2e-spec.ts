import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { CreateUserDto } from '../src/modules/user/dto/create-user.dto';
import { NewTransactionDto } from '../src/modules/transaction/dto/new-transaction.dto';
import { NewCategoryDto } from '../src/modules/category/dto/new-category.dto';
import { PrismaService } from '../src/database/Prisma.service';

describe('App 2e2', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: CreateUserDto = {
      email: 'test@gmail.com',
      password: '123456',
    };
    describe('SignUp', () => {
      it('should throw error email empty', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({ password: '123456' })
          .expectStatus(400);
      });

      it('should register', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('SignIn', () => {
      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'accessToken');
      });
    });
  });

  describe('Category', () => {
    describe('Get empty', () => {
      it('should get categories', () => {
        return pactum
          .spec()
          .get('/category')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
    describe('Create category', () => {
      const dto: NewCategoryDto = {
        name: 'For house',
      };

      const dto2 = { ...dto, name: 'Groceries' };
      it('should create category', () => {
        return pactum
          .spec()
          .post('/category')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(201)
          .withBody(dto)
          .stores('categoryId', 'id');
      });

      it('should create second category', () => {
        return pactum
          .spec()
          .post('/category')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(201)
          .withBody(dto2)
          .stores('categoryId2', 'id');
      });
    });
    describe('Get users categories', () => {
      it('should get 2 categories', () => {
        return pactum
          .spec()
          .get('/category')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(2);
      });
    });
  });

  //transactions
  describe('Transactions', () => {
    describe('Create transaction', () => {
      const dto: NewTransactionDto = {
        amount: 23.33,
        description: 'random description',
      };

      const dto2 = { ...dto, amount: 45 };
      it('should create transaction', () => {
        return pactum
          .spec()
          .post('/transaction/{categoryId}')
          .withPathParams('categoryId', '$S{categoryId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(201)
          .withBody(dto)
          .inspect();
      });

      it('should create second transaction', () => {
        return pactum
          .spec()
          .post('/transaction/{categoryId}')
          .withPathParams('categoryId', '$S{categoryId2}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(201)
          .withBody(dto2);
      });
    });

    describe('Create transaction', () => {
      it('should get transaction', () => {
        return pactum
          .spec()
          .get('/transaction/getall')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(2);
      });
    });
  });
});

import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
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

    app.useLogger(new Logger());
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

  //categories
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
      it('should create third category', () => {
        return pactum
          .spec()
          .post('/category')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(201)
          .withBody({ ...dto2, name: 'for delete' })
          .stores('categoryId3', 'id');
      });
    });
    describe('Get users categories', () => {
      it('should get 2 categories', () => {
        return pactum
          .spec()
          .get('/category')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(3);
      });
    });

    describe('update category', () => {
      it('should update category by id', () => {
        return pactum
          .spec()
          .patch('/category/{categoryId}')

          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .withBody({ name: 'Bikes' });
      });
    });

    describe('delete category', () => {
      it('should delete category by id', () => {
        return pactum
          .spec()
          .withPathParams('categoryId', '$S{categoryId}')
          .delete('/category/{categoryId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(204)
          .withPathParams('categoryId', '$S{categoryId3}');
      });
    });
    describe('Get users categories', () => {
      it('should get 2 categories after deleting one', () => {
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
          .withBody(dto);
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

    describe('Get categories with transactions in time range', () => {
      it('should get transaction', () => {
        return pactum
          .spec()
          .get('/category/time-range')
          .withQueryParams('start', '2023-03-07')
          .withQueryParams('end', '2023-03-07')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(2)
          .inspect();
      });
    });
  });
});

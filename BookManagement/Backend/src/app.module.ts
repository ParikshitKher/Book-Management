import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { isAuthenticated } from './app.middleware';

@Module({
  imports: [
    BookModule,
    MongooseModule.forRoot('mongodb://localhost:27017/book'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes(AppController);
  }
}

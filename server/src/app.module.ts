import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { DatabaseModule } from './modules/database.module';
import { UsersModule } from './modules/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ProductsModule } from './modules/products.module';
import { ConversionsModule } from './modules/conversions.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, ProductsModule, ConversionsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
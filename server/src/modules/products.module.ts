import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsController } from '../controllers/products.controller';
import { ProductsService } from '../services/products.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
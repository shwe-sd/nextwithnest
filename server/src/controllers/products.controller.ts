import { Controller, Post, Res, HttpStatus, UseGuards, Body, Get, Query } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Res() res,
    @Query('sort') sort: string,
    @Query('shop_name') shopName?: string,
    @Query('shop_type') shopType?: string,
    @Query('sort_type') sortType?: string,
    @Query('country') country?: string,
    @Query('filters') filters?: any
  ) {
    const body: any = {
      page: 1,
      limit: 100,
      filters: {}
    };

    // Support both flat and nested filters
    if (shopName || (filters && filters.shop_name)) body.filters.shop_name = shopName || filters.shop_name;
    if (shopType || (filters && filters.shop_type)) body.filters.shop_type = shopType || filters.shop_type;
    if (sortType || (filters && filters.sort_type)) body.filters.sort_type = sortType || filters.sort_type;
    if (country || (filters && filters.country)) body.filters.country = country || filters.country;

    // Fallback for 'sort' param if needed
    if (sort === 'high_commission' && !body.filters.sort_type) {
      body.filters.sort_type = 'high_commission';
    }

    // Remove filters if empty
    if (Object.keys(body.filters).length === 0) delete body.filters;

    const products = await this.productsService.getShopeeProducts(body);
    res.status(HttpStatus.OK).json(products);
  }
}
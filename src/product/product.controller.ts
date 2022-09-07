import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { FilterProductDto } from './dtos/filter-product.dto';

@Controller('store/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async getProducts(@Query() filterProductDto: FilterProductDto) {
    if (Object.keys(filterProductDto).length) {
      const filteredProducts = await this.productService.getFilteredProducts(
        filterProductDto,
      );
      return filteredProducts;
    } else {
      return this.productService.getAllProducts();
    }
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exists');
    return product;
  }

  @Post('/')
  async addProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.addProduct(createProductDto);
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    const product = await this.productService.updateProduct(
      id,
      createProductDto,
    );
    if (!product) throw new NotFoundException('Product does not exists');
    return product;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exists');
    return product;
  }
}

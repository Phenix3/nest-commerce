import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Product, ProductDocument} from './schemas/product.schema';
import {CreateProductDto} from './dtos/create-product.dto';
import {FilterProductDto} from './dtos/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getFilteredProducts(
    filterProductDto: FilterProductDto,
  ): Promise<Product[]> {
    const { search, category } = filterProductDto;
    let products = await this.getAllProducts();

    if (search) {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category) {
      products = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase(),
      );
    }

    return products;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async getProduct(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async addProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDto);
    return newProduct.save();
  }

  async updateProduct(
    id: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      createProductDto,
      { new: true },
    );
    return product.save();
  }

  async deleteProduct(id: string): Promise<any> {
    return await this.productModel.findByIdAndRemove(id);
  }
}

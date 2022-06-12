import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>) { }

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.save(this.productRepository.create(createProductDto));
    } catch (error) {
      throw new HttpException('Product allready exist', HttpStatus.CONFLICT);

    }
  }

  async findAll() {
    const categories = await this.productRepository.find();
    return categories;
  }

  async findOneByIdOrThrow(id: string) {
    const product = await this.productRepository.findOne({ id });

    if (!product) {
      throw new NotFoundException('No product found.');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    try {

      const existingProduct = await this.findOneByIdOrThrow(id);

      const product = this.productRepository.create({
        ...existingProduct,
        ...updateProductDto,
      });

      const updatedProduct = await this.productRepository.save(product);

      return updatedProduct;

    } catch (error) {
      throw new BadRequestException('No product found.');
    }
  }

  async remove(id: string) {
    const product = await this.findOneByIdOrThrow(id);

    await this.productRepository.remove([product]);

    return null;

  }
}

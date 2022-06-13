import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { FamilyModule } from '../family/family.module';
import { ProductionModule } from '../production/production.module';
import { CategoryModule } from '../category/category.module';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), ProductionModule, FamilyModule, CategoryModule, DefaultAdminModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('Product', ProductEntity)
  }
}

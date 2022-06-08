import { Module } from '@nestjs/common';
import { CategoryFamilyService } from './category-family.service';
import { CategoryFamilyController } from './category-family.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryFamilyEntity } from './entities/category-family.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryFamilyEntity])],
  controllers: [CategoryFamilyController],
  providers: [CategoryFamilyService]
})
export class CategoryFamilyModule { }

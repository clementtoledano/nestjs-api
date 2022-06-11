import { Module } from '@nestjs/common';
import { ValueService } from './value.service';
import { ValueController } from './value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValueEntity } from './entities/value.entity';
import { ProductModule } from '../product/product.module';
import { FilterModule } from '../filter/filter.module';

@Module({
  imports: [TypeOrmModule.forFeature([ValueEntity]), ProductModule, FilterModule],
  controllers: [ValueController],
  providers: [ValueService]
})
export class ValueModule { }

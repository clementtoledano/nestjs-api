import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { UnitModule } from '../unit/unit.module';
import { FilterEntity } from './entities/filter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilterEntity]), UnitModule],
  controllers: [FilterController],
  providers: [FilterService]
})
export class FilterModule { }

import { Module } from '@nestjs/common';
import { ProductionService } from './production.service';
import { ProductionController } from './production.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionEntity } from './entities/production.entity';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionEntity]), CompanyModule],
  controllers: [ProductionController],
  providers: [ProductionService]
})
export class ProductionModule { }

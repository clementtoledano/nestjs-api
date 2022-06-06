import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { CompanyTypeModule } from '../company-type/company-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity]), CompanyTypeModule],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule { }

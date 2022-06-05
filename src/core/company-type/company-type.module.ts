import { Module } from '@nestjs/common';
import { CompanyTypeService } from './company-type.service';
import { CompanyTypeController } from './company-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyTypeEntity } from './entities/company-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyTypeEntity])],

  controllers: [CompanyTypeController],
  providers: [CompanyTypeService]
})
export class CompanyTypeModule { }

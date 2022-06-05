import { Module } from '@nestjs/common';
import { CompanyTypeService } from './company-type.service';
import { CompanyTypeController } from './company-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyType } from './entities/company-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyType])],

  controllers: [CompanyTypeController],
  providers: [CompanyTypeService]
})
export class CompanyTypeModule { }

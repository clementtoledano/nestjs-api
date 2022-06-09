import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { CodeNafModule } from '../code-naf/code-naf.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity]), CodeNafModule],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule { }

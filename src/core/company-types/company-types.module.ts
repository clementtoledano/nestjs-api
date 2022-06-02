import { Module } from '@nestjs/common';
import { CompanyTypesService } from './company-types.service';
import { CompanyTypesController } from './company-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyType } from './entities/company-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyType])],

  controllers: [CompanyTypesController],
  providers: [CompanyTypesService]
})
export class CompanyTypesModule {}

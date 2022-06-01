import { Module } from '@nestjs/common';
import { CompanyTypesService } from './company-types.service';
import { CompanyTypesController } from './company-types.controller';

@Module({
  controllers: [CompanyTypesController],
  providers: [CompanyTypesService]
})
export class CompanyTypesModule {}

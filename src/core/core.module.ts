import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { FamilyModule } from './family/family.module';
import { CodeNafModule } from './code-naf/code-naf.module';
import { CategoryModule } from './category/category.module';
import { FilterModule } from './filter/filter.module';
import { UnitModule } from './unit/unit.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CompanyModule,
    CodeNafModule,
    FamilyModule,
    CategoryModule,
    FilterModule,
    UnitModule
  ],
  providers: [],
  exports: [UserModule, AuthModule],
})
export class CoreModule { }

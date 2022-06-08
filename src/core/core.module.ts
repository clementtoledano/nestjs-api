import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CompanyTypeModule } from './company-type/company-type.module';
import { UserModule } from './user/user.module';
import { CategoryFamilyModule } from './category-family/category-family.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CompanyModule,
    CompanyTypeModule,
    CategoryFamilyModule
  ],
  providers: [],
  exports: [UserModule, AuthModule],
})
export class CoreModule { }

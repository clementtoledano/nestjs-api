import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { FamilyModule } from './family/family.module';
import { CodeNafModule } from './code-naf/code-naf.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CompanyModule,
    CodeNafModule,
    FamilyModule
  ],
  providers: [],
  exports: [UserModule, AuthModule],
})
export class CoreModule { }

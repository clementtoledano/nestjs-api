import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from './database/typeorm-config.service';

import appConfig from './config/app.config';
import { HeaderResolver, I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { DefaultAdminModule } from 'nestjs-admin';
import * as path from 'path';

import databaseConfig from './config/database.config';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { CodeNafModule } from './modules/code-naf/code-naf.module';
import { FamilyModule } from './modules/family/family.module';
import { CategoryModule } from './modules/category/category.module';
import { FilterModule } from './modules/filter/filter.module';
import { UnitModule } from './modules/unit/unit.module';
import { ProductionModule } from './modules/production/production.module';
import { ProductModule } from './modules/product/product.module';
import { ValueModule } from './modules/value/value.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    DefaultAdminModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('app.fallbackLanguage'),
        loaderOptions: {
          path: path.join(configService.get('app.workingDirectory') as string, 'src', 'i18n'),
        },
      }),

      loader: I18nJsonLoader,
      resolvers: [new HeaderResolver(['x-custom-lang'])],
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    CodeNafModule,
    FamilyModule,
    CategoryModule,
    FilterModule,
    UnitModule,
    ProductionModule,
    ProductModule,
    ValueModule,
  ],
  providers: [],
  exports: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/register', method: RequestMethod.POST },
        { path: '/auth/login', method: RequestMethod.POST },
        '/admin/(.*)',
      )
      .forRoutes('')
  }
}

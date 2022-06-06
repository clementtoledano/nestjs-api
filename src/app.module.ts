import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from './database/typeorm-config.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { HeaderResolver, I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { AuthMiddleware } from './middleware/auth.middleware';

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
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('app.fallbackLanguage'),
        loaderOptions: {
          path: path.join(configService.get('app.workingDirectory'), 'src', 'i18n'),
        },
      }),
      loader: I18nJsonLoader,
      resolvers: [new HeaderResolver(['x-custom-lang'])],
      inject: [ConfigService],
    }),
    SharedModule,
    CoreModule,
  ],
  providers: [],
  exports: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/api/auth/register', method: RequestMethod.POST },
        { path: '/api/auth/login', method: RequestMethod.POST }
      )
      .forRoutes('')
  }
}

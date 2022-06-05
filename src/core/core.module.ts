import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
  ],
  providers: [],
  exports: [UsersModule, AuthModule],
})
export class CoreModule { }

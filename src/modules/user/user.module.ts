import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DefaultAdminModule, DefaultAdminSite } from "nestjs-admin";
import { AuthModule } from "../auth/auth.module";
import { UserEntity } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => AuthModule),
        DefaultAdminModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {
    constructor(private readonly adminSite: DefaultAdminSite) {
        // Register the User entity under the "User" section
        adminSite.register('User', UserEntity)
    }
}
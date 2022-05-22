import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { CreateUserService } from "./services/create.user.service";
import { GetUserByLoginService } from "./services/get.user.by.login.service";
import { GetUserService } from "./services/get.user.service";
import { GetUsersService } from "./services/get.users.service";
import { UsersController } from "./users.controller";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [GetUsersService, GetUserService, GetUserByLoginService, CreateUserService],
    exports: [GetUserByLoginService, CreateUserService],
})
export class UsersModule { }
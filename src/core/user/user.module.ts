import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { UserEntity } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UsersModule { }
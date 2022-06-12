import {
    Controller, Get,
    HttpStatus,
    HttpCode,
    Param,
    Post,
    Body,
    ValidationPipe,
    UsePipes,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';


import { /* ApiBearerAuth, */ ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';


@ApiTags('user')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.userService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        const user = this.userService.getOne({ id: id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} was not found`);
        }
        return user;
    }


    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }



}
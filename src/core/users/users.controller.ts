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
import { UsersService } from './users.service';


 @ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.usersService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        const user = this.usersService.getOne({id: id});
        if (!user) {
            throw new NotFoundException(`User with id ${id} was not found`);
        }
        return user;
    }


    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }



}
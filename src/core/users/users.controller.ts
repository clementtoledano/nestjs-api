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
import { GetUserService } from './services/get.user.service';
import { GetUsersService } from './services/get.users.service';
import { CreateUserService } from './services/create.user.service';

// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
    constructor(
        private readonly getUserService: GetUserService,
        private readonly getUsersService: GetUsersService,
        private readonly createUserService: CreateUserService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.getUsersService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        const user = this.getUserService.getById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} was not found`);
        }
        return user;
    }


    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
        return this.createUserService.create(createUserDto);
    }



}
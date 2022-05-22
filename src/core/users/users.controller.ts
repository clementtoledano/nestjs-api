import {
    Controller, Get,
    HttpStatus,
    HttpCode,
    Param,
    Post,
    Body,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { UsersService } from './users.service';

// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createProfileDto: CreateUserDto) {
        return this.usersService.create(createProfileDto);
    }

    // @Get()
    // @HttpCode(HttpStatus.OK)
    // async findAll(
    //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    // ) {
    //   if (limit > 50) {
    //     limit = 50;
    //   }

    //   return infinityPagination(
    //     await this.usersService.findManyWithPagination({
    //       page,
    //       limit,
    //     }),
    //     { page, limit },
    //   );
    // }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.usersService.findAll();
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        return this.usersService.findOne({ id: +id });
    }

}
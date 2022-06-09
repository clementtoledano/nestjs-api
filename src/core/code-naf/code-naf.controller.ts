import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CodeNafService } from './code-naf.service';
import { CreateCodeNafDto } from './dto/create-code-naf.dto';
import { UpdateCodeNafDto } from './dto/update-code-naf.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('code-naf')
@Controller('code-naf')
export class CodeNafController {
  constructor(private readonly codeNafService: CodeNafService) { }

  @Post()
  create(@Body() createCodeNafDto: CreateCodeNafDto) {
    return this.codeNafService.create(createCodeNafDto);
  }

  @Get()
  findAll() {
    return this.codeNafService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codeNafService.findOneByIdOrThrow(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCodeNafDto: UpdateCodeNafDto) {
    return this.codeNafService.update(id, updateCodeNafDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codeNafService.remove(id);
  }
}

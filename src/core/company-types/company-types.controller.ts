import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyTypesService } from './company-types.service';
import { CreateCompanyTypeDto } from './dto/create-company-type.dto';
import { UpdateCompanyTypeDto } from './dto/update-company-type.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('company-types')
@Controller('company-types')
export class CompanyTypesController {
  constructor(private readonly companyTypesService: CompanyTypesService) {}

  @Post()
  create(@Body() createCompanyTypeDto: CreateCompanyTypeDto) {
    return this.companyTypesService.create(createCompanyTypeDto);
  }

  @Get()
  findAll() {
    return this.companyTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyTypeDto: UpdateCompanyTypeDto) {
    return this.companyTypesService.update(+id, updateCompanyTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyTypesService.remove(+id);
  }
}

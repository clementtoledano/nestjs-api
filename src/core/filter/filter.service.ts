import { Injectable } from '@nestjs/common';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';

@Injectable()
export class FilterService {
  create(createFilterDto: CreateFilterDto) {
    return createFilterDto;
  }

  findAll() {
    return `This action returns all filter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filter`;
  }

  update(id: number, updateFilterDto: UpdateFilterDto) {
    return updateFilterDto;
  }

  remove(id: number) {
    return `This action removes a #${id} filter`;
  }
}

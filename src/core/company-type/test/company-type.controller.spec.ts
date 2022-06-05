import { Test, TestingModule } from '@nestjs/testing';
import { CompanyTypesController } from '../company-type.controller';
import { CompanyTypesService } from '../company-type.service';

describe('CompanyTypesController', () => {
  let controller: CompanyTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyTypesController],
      providers: [CompanyTypesService],
    }).compile();

    controller = module.get<CompanyTypesController>(CompanyTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CompanyTypesService } from './company-types.service';

describe('CompanyTypesService', () => {
  let service: CompanyTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyTypesService],
    }).compile();

    service = module.get<CompanyTypesService>(CompanyTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

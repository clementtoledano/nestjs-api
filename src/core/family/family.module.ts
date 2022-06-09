import { Module } from '@nestjs/common';
import { FamilyService } from './family.service';
import { FamilyController } from './family.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyEntity } from './entities/family.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyEntity])],
  controllers: [FamilyController],
  providers: [FamilyService]
})
export class FamilyModule { }

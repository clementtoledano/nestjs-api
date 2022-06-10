import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { UnitEntity } from './entities/unit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UnitEntity])],

  controllers: [UnitController],
  providers: [UnitService]
})
export class UnitModule { }

import { Module } from '@nestjs/common';
import { CodeNafService } from './code-naf.service';
import { CodeNafController } from './code-naf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeNafEntity } from './entities/code-naf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CodeNafEntity])],

  controllers: [CodeNafController],
  providers: [CodeNafService]
})
export class CodeNafModule { }

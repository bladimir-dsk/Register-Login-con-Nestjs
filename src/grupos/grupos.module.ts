import { Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { Salone } from 'src/salones/entities/salone.entity';
import { SalonesService } from 'src/salones/salones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grupo, Salone])],
  controllers: [GruposController],
  providers: [GruposService, SalonesService],
  exports: [GruposService],
})
export class GruposModule {}

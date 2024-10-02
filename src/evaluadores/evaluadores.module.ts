import { Module } from '@nestjs/common';
import { EvaluadoresService } from './evaluadores.service';
import { EvaluadoresController } from './evaluadores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluadore } from './entities/evaluadore.entity';
import { Grupo } from 'src/grupos/entities/grupo.entity';
import { GruposService } from 'src/grupos/grupos.service';
import { Salone } from 'src/salones/entities/salone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluadore, Grupo, Salone])],
  controllers: [EvaluadoresController],
  providers: [EvaluadoresService, GruposService],
})
export class EvaluadoresModule {}

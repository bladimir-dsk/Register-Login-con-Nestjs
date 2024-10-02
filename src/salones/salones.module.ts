import { Module } from '@nestjs/common';
import { SalonesService } from './salones.service';
import { SalonesController } from './salones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salone } from './entities/salone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salone])],
  controllers: [SalonesController],
  providers: [SalonesService],
  exports: [SalonesService],
})
export class SalonesModule {}

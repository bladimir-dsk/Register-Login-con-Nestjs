import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluadoresService } from './evaluadores.service';
import { CreateEvaluadoreDto } from './dto/create-evaluadore.dto';
import { UpdateEvaluadoreDto } from './dto/update-evaluadore.dto';

@Controller('evaluadores')
export class EvaluadoresController {
  constructor(private readonly evaluadoresService: EvaluadoresService) {}

  @Post()
  create(@Body() createEvaluadoreDto: CreateEvaluadoreDto) {
    return this.evaluadoresService.create(createEvaluadoreDto);
  }

  @Get()
  findAll() {
    return this.evaluadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluadoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluadoreDto: UpdateEvaluadoreDto) {
    return this.evaluadoresService.update(+id, updateEvaluadoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluadoresService.remove(+id);
  }
}

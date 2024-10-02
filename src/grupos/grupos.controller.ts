import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Response } from 'express';

@Controller('grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Post()
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.gruposService.create(createGrupoDto);
  }

  @Get()
  findAll() {
    return this.gruposService.findAll();
  }
  @Get('/todos')
  findtodos() {
    return this.gruposService.findtodos();
  }
  @Get('export')
  async exportTop3Grupos(@Res() res: Response) {
    return this.gruposService.exportTop3GruposToExcel(res);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.gruposService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.gruposService.update(+id, updateGrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.gruposService.remove(+id);
  }
}

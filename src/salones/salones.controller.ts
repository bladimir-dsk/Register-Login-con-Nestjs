import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalonesService } from './salones.service';
import { CreateSaloneDto } from './dto/create-salone.dto';
import { UpdateSaloneDto } from './dto/update-salone.dto';

@Controller('salones')
export class SalonesController {
  constructor(private readonly salonesService: SalonesService) {}

  @Post()
  create(@Body() createSaloneDto: CreateSaloneDto) {
    return this.salonesService.create(createSaloneDto);
  }

  @Get()
  findAll() {
    return this.salonesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salonesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaloneDto: UpdateSaloneDto) {
    return this.salonesService.update(+id, updateSaloneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salonesService.remove(+id);
  }
}

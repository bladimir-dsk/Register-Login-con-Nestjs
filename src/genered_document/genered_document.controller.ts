import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneredDocumentService } from './genered_document.service';
import { CreateGeneredDocumentDto } from './dto/create-genered_document.dto';
import { UpdateGeneredDocumentDto } from './dto/update-genered_document.dto';

@Controller('genered-document')
export class GeneredDocumentController {
  constructor(private readonly generedDocumentService: GeneredDocumentService) {}

  @Post()
  create(@Body() createGeneredDocumentDto: CreateGeneredDocumentDto) {
    return this.generedDocumentService.create(createGeneredDocumentDto);
  }

  @Get()
  findAll() {
    return this.generedDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generedDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneredDocumentDto: UpdateGeneredDocumentDto) {
    return this.generedDocumentService.update(+id, updateGeneredDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generedDocumentService.remove(+id);
  }
}

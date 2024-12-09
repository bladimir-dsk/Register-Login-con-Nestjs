import { Injectable } from '@nestjs/common';
import { CreateGeneredDocumentDto } from './dto/create-genered_document.dto';
import { UpdateGeneredDocumentDto } from './dto/update-genered_document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneredDocument } from './entities/genered_document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneredDocumentService {
  constructor(
    @InjectRepository(GeneredDocument) private readonly generedRepository: Repository<GeneredDocument>
  ){}
  create(createGeneredDocumentDto: CreateGeneredDocumentDto) {
    const newgeneredDocument = this.generedRepository.create(createGeneredDocumentDto)
    return this.generedRepository.save(newgeneredDocument);
  }

  findAll() {
    return this.generedRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} generedDocument`;
  }

  update(id: number, updateGeneredDocumentDto: UpdateGeneredDocumentDto) {
    return `This action updates a #${id} generedDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} generedDocument`;
  }
}

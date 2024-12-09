import { Injectable } from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document_type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentType } from './entities/document_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectRepository(DocumentType) private readonly documentTyperRepository: Repository<DocumentType>
  ){}
  async create(createDocumentTypeDto: CreateDocumentTypeDto) {
   const newDocumentType = this.documentTyperRepository.create(createDocumentTypeDto);
    return await this.documentTyperRepository.save(newDocumentType);
  }

  findAll() {
    return this.documentTyperRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} documentType`;
  }

  update(id: number, updateDocumentTypeDto: UpdateDocumentTypeDto) {
    return `This action updates a #${id} documentType`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentType`;
  }
}

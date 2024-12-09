import { Module } from '@nestjs/common';
import { DocumentTypeService } from './document_type.service';
import { DocumentTypeController } from './document_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentType } from './entities/document_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentType])],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
  exports: [DocumentTypeService],
})
export class DocumentTypeModule {}

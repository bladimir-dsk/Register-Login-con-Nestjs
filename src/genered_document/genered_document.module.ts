import { Module } from '@nestjs/common';
import { GeneredDocumentService } from './genered_document.service';
import { GeneredDocumentController } from './genered_document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneredDocument } from './entities/genered_document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeneredDocument])],
  controllers: [GeneredDocumentController],
  providers: [GeneredDocumentService],
})
export class GeneredDocumentModule {}

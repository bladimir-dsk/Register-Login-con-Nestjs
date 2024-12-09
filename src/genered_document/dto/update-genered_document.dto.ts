import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneredDocumentDto } from './create-genered_document.dto';

export class UpdateGeneredDocumentDto extends PartialType(CreateGeneredDocumentDto) {}

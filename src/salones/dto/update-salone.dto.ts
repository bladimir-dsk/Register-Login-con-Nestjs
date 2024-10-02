import { PartialType } from '@nestjs/mapped-types';
import { CreateSaloneDto } from './create-salone.dto';

export class UpdateSaloneDto extends PartialType(CreateSaloneDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluadoreDto } from './create-evaluadore.dto';

export class UpdateEvaluadoreDto extends PartialType(CreateEvaluadoreDto) {}

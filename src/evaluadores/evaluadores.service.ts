import { Grupo } from 'src/grupos/entities/grupo.entity';
import { Injectable } from '@nestjs/common';
import { CreateEvaluadoreDto } from './dto/create-evaluadore.dto';
import { UpdateEvaluadoreDto } from './dto/update-evaluadore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluadore } from './entities/evaluadore.entity';
import { Repository } from 'typeorm';


@Injectable()
export class EvaluadoresService {
  constructor(
    @InjectRepository(Evaluadore) private readonly evaluadorrepository: Repository<Evaluadore>,
    @InjectRepository(Grupo) private readonly gruporepository: Repository<Grupo>
  ) { }
  async create(createEvaluadoreDto: CreateEvaluadoreDto) {
      // Busca el salón por su ID
  const grupo = await this.gruporepository.findOne({
    where: { id: createEvaluadoreDto.grupoId },
  });

  if (!grupo) {
    throw new Error('El salón especificado no existe');
  }

  // Crea el nuevo grupo y lo asocia con el salón
  const gruponew = this.evaluadorrepository.create({
    ...createEvaluadoreDto,
    grupoId: grupo,  // Asociar el salón con el grupo
  });

  // Guarda el grupo en la base de datos
  return await this.evaluadorrepository.save(gruponew);
  }

  findAll() {
    return this.gruporepository.find({relations: { evaluador: true  }})
  }

  findOne(id: number) {
    return `This action returns a #${id} evaluadore`;
  }

  update(id: number, updateEvaluadoreDto: UpdateEvaluadoreDto) {
    return `This action updates a #${id} evaluadore`;
  }

  remove(id: number) {
    return `This action removes a #${id} evaluadore`;
  }
}

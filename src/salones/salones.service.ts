import { Injectable } from '@nestjs/common';
import { CreateSaloneDto } from './dto/create-salone.dto';
import { UpdateSaloneDto } from './dto/update-salone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Salone } from './entities/salone.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalonesService {
  constructor(
    @InjectRepository(Salone) 
    private readonly saloneRepository: Repository<Salone>
  ) {}
  async create(createSaloneDto: CreateSaloneDto) {
    const newSalone = this.saloneRepository.create(createSaloneDto) 
    await this.saloneRepository.save(newSalone)
    return newSalone
  }

  findAll() {
    return this.saloneRepository.find()
  }

  async findOne(id: number) {
    const newSolone = await this.saloneRepository.findOne({where: {id}})
    
  }

  update(id: number, updateSaloneDto: UpdateSaloneDto) {
    return `This action updates a #${id} salone`;
  }

  remove(id: number) {
    return `This action removes a #${id} salone`;
  }
}

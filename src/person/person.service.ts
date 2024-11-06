import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto, user: UserActiveInterface) {
    const existingPerson = await this.personRepository.findOne({
      where: { email: createPersonDto.email },
    });
  
    if (existingPerson) {
      throw new BadRequestException('El email ya se encuentra registrado');
    }
  
    const newPerson = this.personRepository.create({
      ...createPersonDto,
      userEmail: user.email,
    });
    
    return await this.personRepository.save(newPerson);
  }
  

  findAll(user: UserActiveInterface) {
    return this.personRepository.find({where: {userEmail: user.email}});
  }

  async findOne(id: number, user: UserActiveInterface) {
    const person = await this.personRepository.findOne({where: {id, userEmail: user.email}});
    if (!person) {
      throw new BadRequestException('No se encontro el usuario');
    }
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto, user: UserActiveInterface) {
    const person = await this.personRepository.findOne({where: {id, userEmail: user.email}});
    if (!person) {
      throw new BadRequestException('No se encontro el usuario');
    }
    return this.personRepository.save({...person, ...updatePersonDto});
  }

  async remove(id: number, user: UserActiveInterface) {
    const person = await this.personRepository.findOne({where: {id, userEmail: user.email}});
    if (!person) {
      throw new BadRequestException('No se encontro el usuario');
    }
    return this.personRepository.delete({id});
 
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from 'src/common/enums/rol.enum';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}
  async create(
    createDepartmentDto: CreateDepartmentDto,
    user: UserActiveInterface,
  ) {
    const validatePerson = await this.personRepository.findOne({
      where: { id: createDepartmentDto.personId },
    });
    if (!validatePerson) {
      throw new BadRequestException('La persona no existe');
     
    }

    const newDepartment = this.departmentRepository.create({
      ...createDepartmentDto,
      userEmail: user.email,
      person: validatePerson,
    });
    return await this.departmentRepository.save(newDepartment);
  }

  findAll(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return this.departmentRepository.find();
    }
    return this.departmentRepository.find({ where: { userEmail: user.email } });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const validateDepartment = await this.departmentRepository.findOne({
      where: { id: id, userEmail: user.email },
    });
    if (!validateDepartment) {
      throw new BadRequestException('El departamento no existe');
    }
    return validateDepartment;
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
    user: UserActiveInterface,
  ) {
    const validateDepartment = await this.departmentRepository.findOne({
      where: { id: id, userEmail: user.email },
    });
    if (!validateDepartment) {
      throw new BadRequestException('El departamento no existe');
    }
    const validatePerson = await this.personRepository.findOne({
      where: { id: updateDepartmentDto.personId },
    })
    if (!validatePerson) {
      throw new BadRequestException('La persona no existe');
    }
    Object.assign(validateDepartment, updateDepartmentDto);
    validateDepartment.person = validatePerson;
    validateDepartment.userEmail = user.email;
    return await this.departmentRepository.save(validateDepartment);
  }

  async remove(id: number, user: UserActiveInterface) {
    const validateDepartment = await this.departmentRepository.findOne({
      where: { id: id, userEmail: user.email },
    });
    if (!validateDepartment) {
      throw new BadRequestException('El departamento no existe');
    }
    return this.departmentRepository.delete(id);
  }
}

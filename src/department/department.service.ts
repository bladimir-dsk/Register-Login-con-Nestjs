import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}
  async create(
    createDepartmentDto: CreateDepartmentDto,
    user: UserActiveInterface,
  ) {
    const newDepartment = this.departmentRepository.create({
      ...createDepartmentDto,
      userEmail: user.email,
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
    return this.departmentRepository.update(id, updateDepartmentDto);
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

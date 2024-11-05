import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from 'src/common/enums/rol.enum';
import { Department } from 'src/department/entities/department.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(
    createInventoryDto: CreateInventoryDto,
    user: UserActiveInterface,
  ) {
    const validateDepartment = await this.departmentRepository.findOne({
      where: { id: createInventoryDto.departaments },
    });

    if (!validateDepartment) {
      throw new BadRequestException('El departamento no existe');
    }
    const validateCategory = await this.categoryRepository.findOne({
      where: { id: createInventoryDto.categorys },
    });
    if (!validateCategory) {
      throw new BadRequestException('La categoria no existe');
    }

    const newInventory = this.inventoryRepository.create({
      ...createInventoryDto,
      userEmail: user.email,
      departments: validateDepartment,
      categorys: validateCategory,
    });
    return await this.inventoryRepository.save(newInventory);
  }

  findAll(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return this.inventoryRepository.find();
    }
    return this.inventoryRepository.find({ where: { userEmail: user.email } });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const validateInventory = await this.inventoryRepository.findOne({
      where: { id, userEmail: user.email },
    });

    if (!validateInventory) {
      throw new BadRequestException('El inventario no existe');
    }

    return validateInventory;
  }

  async update(
    id: number,
    updateInventoryDto: UpdateInventoryDto,
    user: UserActiveInterface,
  ) {
    const validateInventory = await this.inventoryRepository.findOne({
      where: { id, userEmail: user.email },
    });

    if (!validateInventory) {
      throw new BadRequestException('El inventario no existe');
    }

    if (updateInventoryDto.departaments) {
      const validateDepartment = await this.departmentRepository.findOne({
        where: { id: updateInventoryDto.departaments },
      });

      if (!validateDepartment) {
        throw new BadRequestException('El departamento no existe');
      }
      validateInventory.departments = validateDepartment;
    }

    if (updateInventoryDto.categorys) {
      const validateCategory = await this.categoryRepository.findOne({
        where: { id: updateInventoryDto.categorys },
      });
      if (!validateCategory) {
        throw new BadRequestException('La categoria no existe');
      }
      validateInventory.categorys = validateCategory;
    }

    Object.assign(validateInventory, updateInventoryDto);
    validateInventory.userEmail = user.email;
    return await this.inventoryRepository.save(validateInventory);
  }
  async remove(id: number, user: UserActiveInterface) {
    const validateInventory = await this.inventoryRepository.findOne({
      where: { id, userEmail: user.email },
    });
    if (!validateInventory) {
      throw new BadRequestException('El inventario no existe');
    }
    return this.inventoryRepository.delete(id);
  }
}

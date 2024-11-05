import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto, user: UserActiveInterface) {
    const newcategory = this.categoryRepository.create({
      ...createCategoryDto,
      userEmail: user.email,
    });
    return this.categoryRepository.save(newcategory);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number, user: UserActiveInterface) {
    const validateCategory = await this.categoryRepository.findOne({
      where: { id: id, userEmail: user.email },
    });
    if (!validateCategory) {
      throw new BadRequestException('La categoria no existe');
    }
    return validateCategory;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    user: UserActiveInterface,
  ) {
    const validateCategory = await this.categoryRepository.findOne({
      where: { id: id, userEmail: user.email },
    });
    if (!validateCategory) {
      throw new BadRequestException('La categoria no existe');
    }
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number, user: UserActiveInterface) {
    const validateCategory = await this.categoryRepository.findOne({
      where: { id: id, userEmail: user.email },
    });
    if (!validateCategory) {
      throw new BadRequestException('La categoria no existe');
    }
    return this.categoryRepository.delete(id);
  }
}

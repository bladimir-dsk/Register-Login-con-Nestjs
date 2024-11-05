import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';


@Auth(Role.ADMIN)

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @ActiveUser() user: UserActiveInterface) {
    return this.categoryService.create(createCategoryDto, user);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.categoryService.findOne(+id, user); 
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto, @ActiveUser() user: UserActiveInterface) {
    return this.categoryService.update(+id, updateCategoryDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.categoryService.remove(+id, user);
  }
}

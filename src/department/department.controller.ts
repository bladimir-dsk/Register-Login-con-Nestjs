import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto, @ActiveUser() user: UserActiveInterface) {
    return this.departmentService.create(createDepartmentDto, user);
  }
  @Auth(Role.ADMIN)
  @Get()
  findAll( @ActiveUser() user: UserActiveInterface) {
    return this.departmentService.findAll(user);
  }

  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.departmentService.findOne(+id, user);
  }
  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDepartmentDto: UpdateDepartmentDto,  @ActiveUser() user: UserActiveInterface) {
    return this.departmentService.update(+id, updateDepartmentDto, user);
  }
  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.departmentService.remove(+id, user);
  }
}

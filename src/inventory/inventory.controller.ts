import { ActiveUser } from './../common/decorators/active-user.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';



@Controller('inventories')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto, @ActiveUser() user: UserActiveInterface) {
    return this.inventoryService.create(createInventoryDto, user);
  }


  @Auth(Role.ADMIN)
  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.inventoryService.findAll(user);
  }
  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.inventoryService.findOne(+id, user);
  }
  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateInventoryDto: UpdateInventoryDto, @ActiveUser() user: UserActiveInterface) {
    return this.inventoryService.update(+id, updateInventoryDto, user);
  }
  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.inventoryService.remove(+id, user);
  }
}

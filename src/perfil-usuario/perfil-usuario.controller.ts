import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerfilUsuarioService } from './perfil-usuario.service';
import { CreatePerfilUsuarioDto } from './dto/create-perfil-usuario.dto';
import { UpdatePerfilUsuarioDto } from './dto/update-perfil-usuario.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Auth(Role.USER)

@Controller('perfil-usuario')
export class PerfilUsuarioController {
  constructor(private readonly perfilUsuarioService: PerfilUsuarioService) {}

  @Post()
  create(@Body() createPerfilUsuarioDto: CreatePerfilUsuarioDto, @ActiveUser() user: UserActiveInterface) {
    return this.perfilUsuarioService.create(createPerfilUsuarioDto, user);
  }

  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.perfilUsuarioService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.perfilUsuarioService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePerfilUsuarioDto: UpdatePerfilUsuarioDto, @ActiveUser() user: UserActiveInterface) {
    return this.perfilUsuarioService.update(+id, updatePerfilUsuarioDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.perfilUsuarioService.remove(+id, user);
  }
}

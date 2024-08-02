import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePerfilUsuarioDto } from './dto/create-perfil-usuario.dto';
import { UpdatePerfilUsuarioDto } from './dto/update-perfil-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilUsuario } from './entities/perfil-usuario.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from '../../src/common/interfaces/user-active.interface';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class PerfilUsuarioService {
  constructor(
    @InjectRepository(PerfilUsuario) private readonly perfilRepository: Repository<PerfilUsuario>
  ){}

  async create(createPerfilUsuarioDto: CreatePerfilUsuarioDto, user: UserActiveInterface) {
    const validarDatos = await this.perfilRepository.findOne({ where: { userEmail: user.email } });
    if (validarDatos) {
      throw new BadRequestException('ya tienes un perfil');
    }
    const perfil = this.perfilRepository.create({
      ...createPerfilUsuarioDto,
      userEmail: user.email,
    });
    return await this.perfilRepository.save(perfil);
  }

  async findAll(user: UserActiveInterface) {
    if (user.role === Role.SOPORTE) {
      return await this.perfilRepository.find({ relations: ['user'] });
    }
    return this.perfilRepository.find({ where: {userEmail: user.email}, relations: ['user'] });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const perfil = await this.perfilRepository.findOne({ where: { id, userEmail: user.email }, relations: ['user'] });
    if (!perfil) {
      return { message: 'Perfil no encontrado' };
    }
    return perfil;
  }

  async update(id: number, updatePerfilUsuarioDto: UpdatePerfilUsuarioDto, user: UserActiveInterface) {
    const perfil = await this.perfilRepository.findOne({ where: { id, userEmail: user.email } });
    if (!perfil) {
      return { message: 'Perfil no encontrado' };
    }
    Object.assign(perfil, updatePerfilUsuarioDto);
    perfil.userEmail = user.email;
    await this.perfilRepository.save(perfil);
    return perfil;
  }

  async remove(id: number, user: UserActiveInterface) {
    const perfil = await this.perfilRepository.findOne({ where: { id, userEmail: user.email } });
    if (!perfil) {
      return { message: 'Perfil no encontrado' };
    }
    await this.perfilRepository.delete(id);
    return { message: 'Perfil eliminado' };
  }
}

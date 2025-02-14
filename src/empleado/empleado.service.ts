import { Injectable } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EmpleadoService {

  constructor(
    @InjectRepository(Empleado) private readonly empleadoRepository: Repository<Empleado>,
    @InjectRepository(Empresa) private readonly empresaRepository: Repository<Empresa>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createEmpleadoDto: CreateEmpleadoDto, user: UserActiveInterface) {
    // 🔹 Buscar la empresa por el id del usuario activo
    const empresa = await this.empresaRepository.findOne({ where: { id_empresa: user.id_empresa } });
    if (!empresa) {
        throw new Error('Empresa no encontrada');
    }

    // 🔹 Buscar el usuario por email en la base de datos
    let usuario = await this.userRepository.findOneBy({ email: createEmpleadoDto.email });

    // Si el checkbox "Aplica en Usuario" está marcado y no existe, creamos el usuario
    if (createEmpleadoDto.aplicaEnUsuario && !usuario) {
        usuario = this.userRepository.create({
            nbNombres: createEmpleadoDto.nbNombres,
            email: createEmpleadoDto.email,
            pwdPassword: createEmpleadoDto.pwdPassword, 
            empresa: empresa // Asignar la entidad completa
        });

        usuario = await this.userRepository.save(usuario);
    }

    const empleado = this.empleadoRepository.create({
        ...createEmpleadoDto,
        userEmail: user.email,
        user: usuario,
        empresa: empresa // Aquí ya pasas la entidad completa
    });

    return await this.empleadoRepository.save(empleado);
}



async findAll(user: UserActiveInterface) {
  return await this.empleadoRepository.find({
    where: {
      empresa: { id_empresa: user.id_empresa }, // Filtra por id_empresa
    },
    relations: ['empresa'],
  });
}






  findOne(id: number) {
    return `This action returns a #${id} empleado`;
  }

  update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    return `This action updates a #${id} empleado`;
  }

  remove(id: number) {
    return `This action removes a #${id} empleado`;
  }
}

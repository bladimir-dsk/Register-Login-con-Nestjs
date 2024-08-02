import { Module } from '@nestjs/common';
import { PerfilUsuarioService } from './perfil-usuario.service';
import { PerfilUsuarioController } from './perfil-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilUsuario } from './entities/perfil-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerfilUsuario])],
  controllers: [PerfilUsuarioController],
  providers: [PerfilUsuarioService],
})
export class PerfilUsuarioModule {}

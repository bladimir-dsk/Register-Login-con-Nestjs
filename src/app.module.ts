import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PerfilUsuarioModule } from './perfil-usuario/perfil-usuario.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5435,
      username: "user_my2home",
      password: "root",
      database: "db_my2home",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PerfilUsuarioModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}

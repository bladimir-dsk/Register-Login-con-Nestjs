import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}
    

    //en el register resivimos el registerDto que se comporta como RegisterDto 
    async register({ nbNombres, email, pwdPassword, empresa }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            throw new BadRequestException("Email already exists");
        }
    
        const userData = {
            nbNombres,
            email,
            pwdPassword: await bcryptjs.hash(pwdPassword, 10)
        };
    
        // Si se envía la empresa, se agrega al objeto
        if (empresa) {
            userData['empresa'] = {
                nombre: empresa.nombre,
            };
        }
    
        return await this.usersService.create(userData);
    }

    
    
    async login({ email, pwdPassword }: LoginDto) {
        const user = await this.usersService.finByEmailWithPassword(email);
        if (!user) {
            throw new UnauthorizedException("Invalid email");
        }
    
        const isPasswordValid = await bcryptjs.compare(pwdPassword, user.pwdPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid password");
        }
    
        const payload = { 
            email: user.email, 
            role: user.role, 
            id_empresa: user.empresa ? user.empresa.id_empresa : null  // Asegúrate de que aquí no sea undefined
        };
    
        const token = await this.jwtService.signAsync(payload);
    
        return {
            token,
            email,
            id_empresa: user.empresa ? user.empresa.id_empresa : null 
        };
    }
    

    async profile({email, role}: {email: string, role: string}){
            //VALIDAMOS QUE EL USUARIO CUMPLA CON EL ROL DE ADMIN PARA DEJARLO INGRESAR
            //if(role !== 'admin'){
            //    throw new UnauthorizedException('NO ESTAS AUTORIZADO PARA INGRESAR, DEBES DE SER ADMIN')
           // }
        
        return await this.usersService.findOneByEmail(email);
    }
}

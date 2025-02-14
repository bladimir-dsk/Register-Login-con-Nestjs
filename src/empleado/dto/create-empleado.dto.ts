import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateEmpleadoDto {

    @IsString()
    nombre: string;

  

    @IsString()
    password: string;

    @IsOptional()
    id_empresa?: number;

    @IsBoolean()
    aplicaEnUsuario: boolean;  // ✅ Nuevo campo para indicar si se crea en `User`

    @IsOptional() // Solo si aplicaEnUsuario es `true`
    @IsString()
    nbNombres?: string;



    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    pwdPassword?: string;

}

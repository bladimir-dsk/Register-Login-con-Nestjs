import { IsDateString, IsNumber, IsString } from "class-validator"

export class CreatePerfilUsuarioDto {
    @IsString()
    genero: string
    @IsString()
    pais: string
    @IsString()
    contacto: string
    @IsNumber()
    edad: number
    @IsDateString()
    fecha_nacimiento: Date
    @IsString()
    direccion: string
}

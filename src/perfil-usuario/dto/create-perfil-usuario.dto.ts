import { IsDateString, IsNumber, IsString } from "class-validator"

export class CreatePerfilUsuarioDto {
    @IsString()
    genero: string
   
}

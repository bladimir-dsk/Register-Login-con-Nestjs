import { Type } from "class-transformer"
import { IsOptional, ValidateNested } from "class-validator"
import { CreateEmpresaDto } from "src/empresa/dto/create-empresa.dto"

export class CreateUserDto {

    email: string
    pwdPassword: string
    nbNombres?: string
    nbPrimerApellido?: string
    nbSegundoApellido?: string
    numTelefonoCelular?: string


    @ValidateNested()
    @Type(() => CreateEmpresaDto)
    @IsOptional()  
    empresa?: CreateEmpresaDto;
}

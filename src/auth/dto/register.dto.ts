import { Transform, Type } from "class-transformer";
import { IsDateString, IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { CreateEmpresaDto } from "src/empresa/dto/create-empresa.dto";

export class RegisterDto{

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    nbNombres:string;
    
    @IsEmail()
    email:string;

    //transform nos sirve para validar que no envien espacios en blanco
    @Transform(({value}) => value.trim()) //el value.trim limpia los caracteres en blanco
    @IsString()
    @MinLength(6)
    pwdPassword:string;


    @ValidateNested()
    @Type(() => CreateEmpresaDto)
    @IsOptional()  
    empresa?: CreateEmpresaDto;
}
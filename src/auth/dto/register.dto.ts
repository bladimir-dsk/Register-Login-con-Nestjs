import { Transform } from "class-transformer";
import { IsDateString, IsEmail, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto{

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    nbNombres:string;
    

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    nbPrimerApellido: string 


    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    nbSegundoApellido: string


    @IsString()
    @MaxLength(10)
    numTelefonoCelular: string;

    @IsEmail()
    email:string;


    //transform nos sirve para validar que no envien espacios en blanco
    @Transform(({value}) => value.trim()) //el value.trim limpia los caracteres en blanco
    @IsString()
    @MinLength(6)
    pwdPassword:string;
}
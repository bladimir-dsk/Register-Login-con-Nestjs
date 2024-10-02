import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateGrupoDto {
    @IsString()
    nombre: string;
    @IsArray()
    salonesIds: number[];
  
}

import { IsNumber, IsString } from "class-validator";

export class CreateSaloneDto {
    @IsString()
    nombre: string;
   
}

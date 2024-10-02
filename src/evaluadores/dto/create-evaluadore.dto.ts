import { IsNumber, IsString } from "class-validator";

export class CreateEvaluadoreDto {
    @IsString()
    nombre: string;
    @IsNumber()

    calificacion: number
    @IsNumber()
    grupoId: number;
}

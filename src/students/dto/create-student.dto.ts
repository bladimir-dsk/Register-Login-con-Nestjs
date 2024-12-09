import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStudentDto {
    @IsNumber()
    id: number;
    @IsString()
    name: string;
    @IsString()
    @IsOptional()
    matricula?: string;
}

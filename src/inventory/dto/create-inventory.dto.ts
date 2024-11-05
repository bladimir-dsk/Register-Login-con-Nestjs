import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateInventoryDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    stock: number;

    @IsString()
    location: string;

    // @IsString()
    // department: string;

    @IsString()
    category: string;

    @IsDate()
    @Type(() => Date)
    dateEntry: Date;

    @IsBoolean()
    @Type(() => Boolean)
    @IsOptional()
    state?: boolean

    @IsString()
    observations: string

    @IsNumber()
    // @IsOptional()
    departaments: number;

    @IsNumber()
    categorys: number;

}

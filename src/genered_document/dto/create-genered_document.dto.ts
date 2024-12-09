import { IsString } from "class-validator";

export class CreateGeneredDocumentDto {
    @IsString()
    name: string

}

import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsDate()
  @Type(() => Date)
  birthdayDate: Date;

  @IsString()
  @MaxLength(10)
  @MinLength(10)
  phone: string;
}

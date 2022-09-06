import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(2, 20)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(2, 20)
    password: string;
}
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(2, 20)
    password: string;
}
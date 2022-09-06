import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/register")
    register(@Body() registerUserDto : RegisterUserDto): Promise<void> {
        return this.authService.registerUser(registerUserDto);
    }

    @Post("/login")
    login(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
        return this.authService.loginUser(loginUserDto);
    }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private encoderService: EncoderService,
        private jwtService: JwtService
    ) {}

    async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
        const { name, email, password} = registerUserDto;
        const hashedPassword = await this.encoderService.encodePassword(password);
        this.usersRepository.createUser(name, email, hashedPassword);
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
        const { email, password } = loginUserDto;
        const user = await this.usersRepository.findOneByEmail(email)

        if(user && (await this.encoderService.checkPassword(password, user.password))) {
            const payload: JwtPayload = { id: user.id, email, active: user.active};
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken}
        }
        throw new UnauthorizedException("Please check your credentials");
    }
}

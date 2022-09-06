import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        configService: ConfigService,
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {
        super({
            secretOrKey: configService.get("JWT_SECRETKEY"),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user = this.usersRepository.findOneByEmail(email);

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
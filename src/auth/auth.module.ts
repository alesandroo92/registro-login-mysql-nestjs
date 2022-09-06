import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EncoderService } from './encoder.service';
import { JwtStrategy } from './jwt-strategy';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
      secret: configService.get("JWT_SECRETKEY"),
      signOptions: {
      expiresIn: 3600
      }
      })
    }),
    TypeOrmModule.forFeature([UsersRepository])],
  controllers: [AuthController],
  providers: [AuthService, EncoderService, JwtStrategy, ConfigService],
  exports: [JwtStrategy, PassportModule] // para que se pueda usar en otros modulos
})
export class AuthModule {}

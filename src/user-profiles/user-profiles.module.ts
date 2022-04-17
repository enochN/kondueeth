import {Module} from '@nestjs/common';
import {AuthController} from './auth/auth.controller';
import {AuthService} from './auth/auth.service';
import PrismaService from "../shared/prisma.service";
import {UsersRepository} from "./users.repository";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./auth/constant";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    controllers: [AuthController],
    imports: [PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '10m' }
    })],
    providers: [AuthService, PrismaService, UsersRepository, LocalStrategy, JwtStrategy]
})
export class UserProfilesModule {
}

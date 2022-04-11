import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import PrismaService from "../shared/prisma.service";
import {UsersRepository} from "./users.repository";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";

@Module({
  controllers: [AuthController],
  imports: [PassportModule],
  providers: [AuthService, PrismaService, UsersRepository, LocalStrategy]
})
export class UserProfilesModule {}

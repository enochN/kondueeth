import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import PrismaService from "../shared/prisma.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
})
export class UserProfilesModule {}

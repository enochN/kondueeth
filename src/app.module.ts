import { Module } from '@nestjs/common';
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { ArticlesModule } from './articles/articles.module';
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./user-profiles/jwt.auth-guard";

@Module({
  imports: [UserProfilesModule, ArticlesModule],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}

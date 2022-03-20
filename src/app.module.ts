import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [UserProfilesModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

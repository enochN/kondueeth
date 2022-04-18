import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import {ArticlesRepository} from "./articles.repository";
import PrismaService from "../shared/prisma.service";

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository, PrismaService]
})
export class ArticlesModule {}

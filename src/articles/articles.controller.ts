import {Body, Controller, Get, Param, Post, Query, Request} from '@nestjs/common';
import {ArticlesService} from "./articles.service";
import {Article} from "../shared/types/articles";
import {NoAuthRequired} from "../shared/public.decorator";

@Controller('articles')
export class ArticlesController {

    constructor(private articlesService: ArticlesService) {
    }

    @Get()
    @NoAuthRequired()
    async getArticles(@Query() query) {
        const [articles, articlesCount] = await Promise.all([
            this.articlesService.findArticles(query),
            this.articlesService.countArticles(query)
        ]);

        return {articles, articlesCount}
    }

    @Get(':slug')
    @NoAuthRequired()
    async getArticleBySlug(@Param('slug') slug: string) {
        const article = await this.articlesService.findArticleBySlug(slug)
        return {article}
    }

    @Post()
    async createArticle(@Request() req, @Body('article') body: Article) {
        const newArticle = await this.articlesService.createNewArticle(req.user, body);
        return {article: newArticle, user: req.user};
    }
}

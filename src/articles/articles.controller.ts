import {Controller, Get, Query} from '@nestjs/common';
import {ArticlesService} from "./articles.service";

@Controller('articles')
export class ArticlesController {

    constructor(private articlesService: ArticlesService) {
    }

    @Get()
    async getArticles(@Query() query) {
        const [articles, articlesCount] = await Promise.all([
            this.articlesService.findArticles(query),
            this.articlesService.countArticles(query)
        ]);

        return {articles, articlesCount}
    }
}

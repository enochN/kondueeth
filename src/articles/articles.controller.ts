import {Controller, DefaultValuePipe, Get, ParseIntPipe, Query} from '@nestjs/common';
import {ArticlesService} from "./articles.service";

@Controller('articles')
export class ArticlesController {

    constructor(private articlesService: ArticlesService) {
    }

    @Get()
    async getArticles(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
                      @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number) {
        const [articles, articlesCount] = await Promise.all([
            this.articlesService.findArticles({page, pageSize}),
            this.articlesService.countArticles()
        ]);

        return {articles, articlesCount}
    }
}

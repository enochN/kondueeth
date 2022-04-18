import { Injectable } from '@nestjs/common';
import {ArticlesRepository} from "./articles.repository";

@Injectable()
export class ArticlesService {

    constructor(private articlesRepository: ArticlesRepository) {
    }

    async findArticles({page, pageSize}){
        return this.articlesRepository.queryArticles({ offset: (page - 1) * pageSize, limit: pageSize});
    }

    async countArticles(){
        return this.articlesRepository.countArticles();
    }
}

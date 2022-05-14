import { Injectable } from '@nestjs/common';
import {ArticlesRepository} from "./articles.repository";


function parseSelectQuery(queryParameters) {
    const page = queryParameters.page ?? 1;
    const pageSize = queryParameters.pageSize ?? 10;
    let selectQuery: any = {offset: (page - 1) * pageSize, limit: pageSize, where: { AND: [] }};
    if(queryParameters.author) {
        selectQuery.where.AND.push({
            author: {
                username: {
                    equals: queryParameters.author
                }
            }
        });
    }
    if(queryParameters.favorited) {
        selectQuery.where.AND.push({
            favoritedBy: {
                some: {
                    username: {
                        equals: queryParameters.favorited
                    }
                }
            }
        });
    }
    return selectQuery;
}

@Injectable()
export class ArticlesService {

    constructor(private articlesRepository: ArticlesRepository) {
    }

    async findArticles(queryParameters){
        const selectQuery = parseSelectQuery(queryParameters);
        return this.articlesRepository.queryArticles(selectQuery);
    }

    async countArticles(queryParameters){
        const selectQuery = parseSelectQuery(queryParameters);
        return this.articlesRepository.countArticles(selectQuery);
    }
}

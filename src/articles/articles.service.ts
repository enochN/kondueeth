import { Injectable } from '@nestjs/common';
import {ArticlesRepository} from "./articles.repository";
import {Article} from "../shared/types/articles";


function parseSelectQuery(queryParameters) {
    const page = queryParameters.page ?? 1;
    const pageSize = queryParameters.pageSize ?? 10;
    let selectQuery: any = {offset: (page - 1) * pageSize, limit: +pageSize, where: { AND: [] }};
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

    async findArticleBySlug(articleSlug){
        return this.articlesRepository.queryArticle(articleSlug);
    }

    async countArticles(queryParameters){
        const selectQuery = parseSelectQuery(queryParameters);
        return this.articlesRepository.countArticles(selectQuery);
    }

    async createNewArticle(currentUser: any, newArticle: Article){
        const articleSlug = this.slugify(newArticle.title);
        return this.articlesRepository.insertNewArticle(currentUser.id, { ...newArticle, slug: articleSlug })
    }

    slugify(title: string){
        return title.trim().toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/ ^-+|-+$/g, '')
            .concat('-')
            .concat((Math.random() * Math.pow(36, 6) | 0).toString(36));
    }
}

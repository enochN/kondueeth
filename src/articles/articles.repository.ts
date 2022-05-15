import {Injectable} from "@nestjs/common";
import PrismaService from "../shared/prisma.service";
import {Article} from "../shared/types/articles";


@Injectable()
export class ArticlesRepository {

    constructor(private prisma: PrismaService) {}


    async queryArticles(selectQuery): Promise<any> {
        return this.prisma.article.findMany({
            where: selectQuery.where,
            skip: selectQuery.offset,
            take: selectQuery.limit,
        });
    }

    async queryArticle(slug): Promise<any> {
        return this.prisma.article.findFirst({
            where: {
                slug: slug
            },
            take: 1,
        });
    }

    async countArticles(selectQuery): Promise<any> {
        return this.prisma.article.count({
            where: selectQuery.where
        });
    }

    async insertNewArticle(userId, articleData: Article): Promise<any> {
        return this.prisma.article.create({
            data: {
                title: articleData.title,
                description: articleData.description,
                body: articleData.body,
                slug: articleData.slug,
                tagList: (articleData.tagList || []).toString(),
                author: {
                    connect: {
                        id: userId
                    }
                }
            },
        });
    }

}

import {Injectable} from "@nestjs/common";
import PrismaService from "../shared/prisma.service";


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

    async countArticles(selectQuery): Promise<any> {
        return this.prisma.article.count({
            where: selectQuery.where
        });
    }

}

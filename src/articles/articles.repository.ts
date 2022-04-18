import {Injectable} from "@nestjs/common";
import PrismaService from "../shared/prisma.service";


@Injectable()
export class ArticlesRepository {

    constructor(private prisma: PrismaService) {}


    async queryArticles({offset,limit}): Promise<any> {
        return this.prisma.article.findMany({
            skip: offset,
            take: limit,
        });
    }

    async countArticles(): Promise<any> {
        return this.prisma.article.count();
    }

}

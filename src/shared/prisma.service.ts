import {PrismaClient} from "@prisma/client";
import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";


@Injectable()
class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super();
    }
    async onModuleDestroy() {
        try {
            await this.$disconnect();
        } catch (e) {
            console.log(e);
        }
    }

    async onModuleInit() {
        try {
            await this.$connect();
        } catch (e) {
            console.log(e);
        }
    }
    
}

export default PrismaService;

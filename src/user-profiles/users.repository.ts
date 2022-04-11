import {Injectable} from "@nestjs/common";
import PrismaService from "../shared/prisma.service";

export type User = any;

export interface RegisterUserInterface {
    email: string;
    password: string;
    username: string;
}

@Injectable()
export class UsersRepository {

    constructor(private prisma: PrismaService) {
    }

    async createUser(data: RegisterUserInterface): Promise<User> {
        return this.prisma.user.create({data: data})
    }

    async findUserByEmail(email: string): Promise<User | undefined> {
        return this.prisma.user.findUnique({
            where: {
                email
            }
        });
    }
}

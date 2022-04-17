import {Injectable} from "@nestjs/common";
import PrismaService from "../shared/prisma.service";

export type User = any;

export interface RegisterUserInterface {
    email: string;
    password: string;
    username: string;
}

export interface UserUpdatableData {
    email?: string,
    bio?: string,
    image?: string,
    username?: string
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

    async findUserById(id: number): Promise<User | undefined> {
        return this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                username: true,
                bio: true,
                image: true,
            }
        });
    }

    async updateUserById(id: number, data: UserUpdatableData): Promise<User | undefined> {
        return this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...data
            },
            select: {
                id: true,
                email: true,
                username: true,
                bio: true,
                image: true,
            }
        })
    }
}

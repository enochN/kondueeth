import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import PrismaService from "../../shared/prisma.service";
import prismaService from "../../shared/prisma.service";
import {User, UsersRepository} from "../users.repository";

interface RegisterUserInterface {
    email: string;
    password: string;
    username: string;
}

@Injectable()
export class AuthService {

    constructor(private usersRepository: UsersRepository) {}

    async registerNewUser(data : RegisterUserInterface): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const { password, ...registeredUser } = await this.usersRepository.createUser({ ...data, password: hashedPassword });
        return registeredUser;
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findUserByEmail(email);
        if(!user){
            return null;
        }
        const isMatchingPassword = await bcrypt.compare(password, user.password)
        if(!isMatchingPassword){
            return null;
        }


        const { password: persistedPassword, ...result } = user;
        return result;
    }
}

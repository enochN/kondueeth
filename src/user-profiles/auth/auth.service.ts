import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {User, UsersRepository, UserUpdatableData} from "../users.repository";
import {JwtService} from "@nestjs/jwt";

interface RegisterUserInterface {
    email: string;
    password: string;
    username: string;
}

@Injectable()
export class AuthService {

    constructor(private usersRepository: UsersRepository, private jwtService: JwtService) {
    }

    async login(user: any): Promise<any> {
        return {
            ...user,
            token: this.jwtService.sign({username: user.username, sub: user.id})
        }
    }

    async registerNewUser(data: RegisterUserInterface): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const {password, ...registeredUser} = await this.usersRepository.createUser({
            ...data,
            password: hashedPassword
        });
        return registeredUser;
    }

    async getUserById(id: number): Promise<User> {
        return this.usersRepository.findUserById(id);
    }

    async updateUserById(id: number, data: UserUpdatableData): Promise<User> {
        return this.usersRepository.updateUserById(id, data);
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findUserByEmail(email);
        if (!user) {
            return null;
        }
        const isMatchingPassword = await bcrypt.compare(password, user.password)
        if (!isMatchingPassword) {
            return null;
        }


        const {password: persistedPassword, ...result} = user;
        return result;
    }
}

import {Body, Controller, Get, Post, Put, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterUserDTO} from "./dto/RegisterUserDTO";
import {LocalAuthGuard} from "../local.auth-guard";
import {UserUpdatableData} from "../users.repository";
import {NoAuthRequired} from "../../shared/public.decorator";
import {User} from "../../shared/user.decorator";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @NoAuthRequired()
    @Post('users')
    registerUser(@Body('user') registerUserDto: RegisterUserDTO): any {
        return this.authService.registerNewUser(registerUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @NoAuthRequired()
    @Post('users/login')
    async loginUser(@Request() req): Promise<any> {
        const user = await this.authService.login(req.user);
        return  { user };
    }

    @Get('user')
    async getCurrentUser(@User('id') userId: number): Promise<any> {
        const user = await this.authService.getUserById(userId);
        return { user };
    }

    @Put('user')
    async updateCurrentUser(@User('id') userId: number, @Body('user') userPatchData: UserUpdatableData): Promise<any> {
        const user = await this.authService.updateUserById(userId, userPatchData);
        return { user };
    }
}

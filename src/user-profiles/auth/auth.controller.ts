import {Body, Controller, Get, Post, Put, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterUserDTO} from "./dto/RegisterUserDTO";
import {LocalAuthGuard} from "../local.auth-guard";
import {JwtAuthGuard} from "../jwt.auth-guard";
import {UserUpdatableData} from "../users.repository";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('users')
    registerUser(@Body('user') registerUserDto: RegisterUserDTO): any {
        return this.authService.registerNewUser(registerUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('users/login')
    async loginUser(@Request() req): Promise<any> {
        const user = await this.authService.login(req.user);
        return  { user };
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getCurrentUser(@Request() req): Promise<any> {
        const user = await this.authService.getUserById(req.user.id);
        return { user };
    }

    @UseGuards(JwtAuthGuard)
    @Put('user')
    async updateCurrentUser(@Request() req, @Body('user') userPatchData: UserUpdatableData): Promise<any> {
        const user = await this.authService.updateUserById(req.user.id, userPatchData);
        return { user };
    }
}

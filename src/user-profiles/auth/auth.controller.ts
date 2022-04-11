import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterUserDTO} from "./dto/RegisterUserDTO";
import {AuthGuard} from "@nestjs/passport";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('users')
    registerUser(@Body('user') registerUserDto: RegisterUserDTO): any {
        return this.authService.registerNewUser(registerUserDto);
    }

    @UseGuards(AuthGuard('local'))
    @Post('users/login')
    loginUser(@Request() req): any {
        return req.user;
    }
}
